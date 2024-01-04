// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;

const mongoURI = "mongodb://127.0.0.1:27017/frontend";

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const categorySchema = new mongoose.Schema({
  category: String,
  subcategory: String,
  description: String,
});

const Category = mongoose.model("Category", categorySchema);

app.get("/api/categories", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const totalCategories = await Category.countDocuments({});
    const totalPages = Math.ceil(totalCategories / limit);

    const categories = await Category.find({})
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ categories, totalPages });
  } catch (error) {
    console.error("Error fetching category data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/categories", async (req, res) => {
  try {
    const { category, subcategory, description } = req.body;

    if (!category || !subcategory || !description) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const newCategory = new Category({
      category,
      subcategory,
      description,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/api/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category, subcategory, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { category, subcategory, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Add this endpoint to fetch distinct category and subcategory names
app.get("/api/distinctCategories", async (req, res) => {
  try {
    const distinctCategories = await Category.distinct("category");
    const distinctSubcategories = await Category.distinct("subcategory");
    res.status(200).json({ distinctCategories, distinctSubcategories });
  } catch (error) {
    console.error("Error fetching distinct categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Add this endpoint to fetch subcategories based on the selected main category
app.get("/api/subcategories", async (req, res) => {
  try {
    const { mainCategory } = req.query;

    const subcategories = await Category.find({ category: mainCategory }).distinct("subcategory");
    res.status(200).json({ subcategories });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.listen(PORT, () => {
  console.log(`CategoriesServer is running on port ${PORT}`);
});
