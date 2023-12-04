const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require("cors");

const mongoURI="mongodb://127.0.0.1:27017/frontend"
const app = express();
const PORT = process.env.PORT || 3003;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const productSchema = new mongoose.Schema({
  mainCategory: String,
  subCategory: String,
  productName: String,
  description: String,
  price: Number,
  offerPrice: Number,
  quantity: Number,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function isValidProductData(productData) {
  return (
    productData.mainCategory &&
    productData.subCategory &&
    productData.productName &&
    productData.description &&
    productData.price > 0 &&
    productData.offerPrice >= 0 &&
    productData.quantity >= 0 &&
    productData.image
  );
}

app.post('/api/products', async (req, res) => {
  try {
    const newProductData = req.body;

     if (!isValidProductData(newProductData) ){
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const product = new Product(newProductData);
    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductData = req.body;

    if (!isValidProductData(updatedProductData))  {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// ... (existing code)

app.delete('/api/products', async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: 'Invalid or missing productIds in the request body' });
    }

    const deletedProducts = await Product.deleteMany({ _id: { $in: productIds } });

    if (deletedProducts.deletedCount > 0) {
      res.status(200).json({ message: 'Products deleted successfully', deletedProducts });
    } else {
      res.status(404).json({ message: 'No matching products found for deletion' });
    }
  } catch (error) {
    console.error('Error deleting products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.listen(PORT, () => {
  console.log(`ProductServer is running on port ${PORT}`);
});
