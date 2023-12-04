import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import "./Products.css";


function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    mainCategory: '',
    subCategory: '',
    productName: '',
    description: '',
    price: 0,
    offerPrice: 0,
    quantity: 0,
    image: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [categories, setMainCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  

  useEffect(() => {
    setSortedProducts([...products].sort((a, b) => b._id.localeCompare(a._id)));
  }, [products]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/distinctCategories');
        const data = await response.json();

        // Update the state for categories and subcategories
        setMainCategories(data.distinctCategories);
        setSubcategories(data.distinctSubcategories);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/subcategories?mainCategory=${selectedMainCategory}`);
        const data = await response.json();

        // Update the state for subcategories
        setSubcategories(data.subcategories);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    if (selectedMainCategory) {
      fetchSubcategories();
    }
  }, [selectedMainCategory]);

   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/products`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
    
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  // ... (existing code)
  const handleCreate = async () => {
    try {
      if (
        selectedMainCategory &&
        selectedSubCategory &&
        newProduct.productName &&
        newProduct.description &&
        newProduct.price > 0 &&
        newProduct.offerPrice >= 0 &&
        newProduct.quantity >= 0 &&
        newProduct.image
      ) {
        const response = await fetch('http://localhost:3003/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mainCategory: selectedMainCategory,
            subCategory: selectedSubCategory,
            productName: newProduct.productName,
            description: newProduct.description,
            price: newProduct.price,
            offerPrice: newProduct.offerPrice,
            quantity: newProduct.quantity,
            image: newProduct.image,
          }),
        });
  
        if (response.ok) {
          console.log('Product created successfully');
  
          // Fetch the updated products and set the state
          const productsResponse = await fetch('http://localhost:3003/api/products');
          const updatedProducts = await productsResponse.json();
          setProducts(updatedProducts);
  
          // Clear the form
          setNewProduct({
            mainCategory: '',
            subCategory: '',
            productName: '',
            description: '',
            price: 0,
            offerPrice: 0,
            quantity: 0,
            image: '',
          });  setSelectedMainCategory('');
          setSelectedSubCategory('')
        } else {
          console.error('Error creating product:', response.status);
        }
      }
    } catch (error) {
      console.error('Error creating product:', error.message);
    }
  };
  const handleUpdate = async () => {
    try {
      if (
        editingProduct &&
        selectedMainCategory &&
        selectedSubCategory &&
        newProduct.productName &&
        newProduct.description &&
        newProduct.price > 0 &&
        newProduct.offerPrice >= 0 &&
        newProduct.quantity >= 0 &&
        newProduct.image
      ) {
        const response = await fetch(`http://localhost:3003/api/products/${editingProduct._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mainCategory: selectedMainCategory,
            subCategory: selectedSubCategory,
            productName: newProduct.productName,
            description: newProduct.description,
            price: newProduct.price,
            offerPrice: newProduct.offerPrice,
            quantity: newProduct.quantity,
            image: newProduct.image,
          }),
        });
  
        if (response.ok) {
          console.log('Product updated successfully');
  
          // Fetch the updated products and set the state
          const productsResponse = await fetch('http://localhost:3003/api/products');
          const updatedProducts = await productsResponse.json();
          setProducts(updatedProducts);
  
          // Clear the form
          setNewProduct({
            mainCategory: '',
            subCategory: '',
            productName: '',
            description: '',
            price: 0,
            offerPrice: 0,
            quantity: 0,
            image: '',
          });

          setSelectedMainCategory('');
        setSelectedSubCategory('');
          setEditingProduct(null);
        } else {
          console.error('Error updating product:', response.status);
        }
      }
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };
  
  
  

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
    setNewProduct({ ...product });
    setSelectedMainCategory(product.mainCategory);
    setSelectedSubCategory(product.subCategory);
  };
  
// ... (existing code)

const handleDeleteSelected = async () => {
  try {
    if (selectedItems.length > 0) {
      const userConfirmed = window.confirm('Are you sure you want to delete the selected products?');

      if (userConfirmed) {
        const response = await fetch('http://localhost:3003/api/products', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productIds: selectedItems }),
        });

        if (response.ok) {
          console.log('Products deleted successfully');
          // Fetch the updated products and set the state
          const productsResponse = await fetch('http://localhost:3003/api/products');
          const updatedProducts = await productsResponse.json();
          setProducts(updatedProducts);
          setSelectedItems([]);
        } else {
          console.error('Error deleting products:', response.statusText);
        }
      }
    }
  } catch (error) {
    console.error('Error deleting products:', error);
  }
};



  

  const handleSelectItem = (productId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productId)) {
        // Deselect if already selected
        return prevSelectedItems.filter((id) => id !== productId);
      } else {
        // Select if not selected
        return [...prevSelectedItems, productId];
      }
    });
  };
  
  
  

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      const allProductIds = sortedProducts.map((product) => product.id);
      setSelectedItems(allProductIds);
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <div className='Products'>
      <div className='ProductsTotal'>
        <div className='ProductsTop'>
          <h1 style={{ width: "40%" }}>Product Management</h1>
          <div className='Topbuttons'>
            {editingProduct ? (
              <button className='ProductsUpdatebutton' onClick={handleUpdate } ><RxUpdate/></button>
            ) : (
              <button className='ProductsCreatebutton' onClick={handleCreate}><IoMdAdd/></button>
            )}
            <button className='ProductsDeleteSelectedButton' onClick={handleDeleteSelected}><AiFillDelete/></button>
          </div>
        </div>

        <div className='ProductsInputfield'>
          <div className='Outline'>
            <ul>
              <div className='Leftside'>
              <li>
                Category Name:
                <select
  className='Categorydropdown' style={{ marginLeft: "11%" }}
  value={selectedMainCategory}
  onChange={(e) => {
    setSelectedMainCategory(e.target.value);
    setSelectedSubCategory(''); // Reset subcategory when main category changes
  }}
>
  <option value='' disabled>Select Main Category</option>
  {categories.map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ))}
</select>

              </li>
              <li>
                Sub-Category Name:
                <select
  className='Categorydropdown' style={{ marginLeft: "2%" }}
  value={selectedSubCategory}
  onChange={(e) => setSelectedSubCategory(e.target.value)}
>
  <option value='' disabled>Select Subcategory</option>
  {subcategories.map((subCategory, index) => (
    <option key={index} value={subCategory}>
      {subCategory}
    </option>
  ))}
</select>

              </li>
<li>
 Product Name:
 <input className="ProductsInput" style={{ marginLeft: "13%" }}
 type="text"
placeholder="Product Name"
value={newProduct.productName}
onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                  />
                </li>
                <li>
                  Description:
                  <input className="ProductsInput" style={{ marginLeft: "19%" }}
                    type="text"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </li>
              </div>
              <div className='Rightside'>
                <li>
                  Product Price:
                  <input className="ProductsInput"
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  />
                </li>
                <li>
                  Offer Price:
                  <input className="ProductsInput" style={{ marginLeft: "8%" }}
                    type="number"
                    placeholder="Offer Price"
                    value={newProduct.offerPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, offerPrice: parseFloat(e.target.value) })}
                  />
                </li>
                <li>
                  Quantity:
                  <input className="ProductsInput" style={{ marginLeft: "12%" }}
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
                  />
                </li>
                <li>
                  Image:
                  <input className="ProductsInput" style={{ marginLeft: "17%" }}
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  />
                </li>
              </div>
            </ul>
          </div>
        </div>
        <table className='ProductsTable'>
          <thead className='ProductsHeader'>
            <tr className='ProductsTr'>
              <th className='ProductsTh'>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className='ProductsTh'>S.No</th>
              <th className='ProductsTh'>Main Category</th>
              <th className='ProductsTh'>Subcategory</th>
              <th className='ProductsTh'>Product Name</th>
              <th className='ProductsTh'>Description</th>
              <th className='ProductsTh'>Price</th>
              <th className='ProductsTh'>Offer Price</th>
              <th className='ProductsTh'>Quantity</th>
              <th className='ProductsTh'>Image</th>
              <th className='ProductsTh'>Actions</th>
            </tr>
          </thead>
          <tbody>
           {sortedProducts.map((product, index) => (
    <tr className='ProductsTr' key={index}>
      <td className='ProductsTd'>
        <input
          type="checkbox"
          checked={selectAll || selectedItems.includes(product._id)}
          onChange={() => handleSelectItem(product._id)}
/>


                </td>
                <td className='ProductsTd'>{index + 1}</td>
                <td className='ProductsTd'>{product.mainCategory}</td>
                <td className='ProductsTd'>{product.subCategory}</td>
                <td className='ProductsTd'>{product.productName}</td>
                <td className='ProductsTd'>{product.description}</td>
                <td className='ProductsTd'>${product.price.toFixed(2)}</td>
                <td className='ProductsTd'>${product.offerPrice.toFixed(2)}</td>
                <td className='ProductsTd'>{product.quantity}</td>
                <td className='ProductsTd'>
                  <img src={product.image} alt={product.productName} style={{ maxWidth: '100px' }} />
                </td>
                <td>
                  <button className='ProductsEditbutton' onClick={() => handleEdit(product)}><MdEdit /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductManagement;