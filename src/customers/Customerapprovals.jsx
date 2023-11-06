import React, { useState } from 'react';

const categorySubcategory = {
  'Category A': ['Attribute 1A', 'Attribute 2A', 'Attribute 3A'],
  'Category B': ['Attribute 1B', 'Attribute 2B', 'Attribute 3B'],
  'Category C': ['Attribute 1C', 'Attribute 2C', 'Attribute 3C'],
};

function SubcategoryDropdown() {
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store selected category
  const [selectedSubcategory, setSelectedSubcategory] = useState(''); // State to store selected attribute
  const Subcategory = categorySubcategory[selectedCategory] || []; // Get attributes for the selected category

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory(''); // Reset selected attribute when category changes
  };

  const handleSubcategoryChange = (e) => {
    const Subcategory = e.target.value;
    setSelectedSubcategory(Subcategory);
  };

  return (
    <div>
      <label htmlFor="category">Select Category:</label>
      <input
        type="text"
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      />
      <br />
      <label htmlFor="Subcategory">Select Subcategory:</label>
      <select id="Subcategory" value={selectedSubcategory} onChange={handleSubcategoryChange}>
        <option value="">Select an Subcategory</option>
        {Subcategory.map((SubCategory) => (
          <option key={SubCategory} value={SubCategory}>
            {SubCategory}
          </option>
        ))}
      </select>

      <br />

      <table>
        <thead>
          <tr>
            <th>Selected Category</th>
            <th>Selected Attribute</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{selectedCategory}</td>
            <td>{selectedSubcategory}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SubcategoryDropdown;
