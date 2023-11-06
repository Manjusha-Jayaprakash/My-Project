import React, { useState } from 'react';
import { useEffect } from 'react';
import "./Categories.css"
import { Button, Container } from 'react-bootstrap';
import { VscAdd } from "react-icons/vsc";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";

function Categories() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    category: '',
    subcategory: '', 
    description:''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSortedProducts([...products].sort((a, b) => b.id - a.id));
  }, [products]);

  const handleCreate = () => {
    if (newProduct.category && newProduct.subcategory && newProduct.description) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({
        category: '',
        subcategory: '',
        description: '',
      });
    }
  };
  
  const handleEdit = (product) => {
    setEditingProduct({ ...product }); // Clone the product to editingProduct
  };

  const handleUpdate = () => {
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? editingProduct : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  
  const handleSelectItem = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
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
  
  const handleDeleteSelected = () => {
    const updatedProducts = products.filter((product) => !selectedItems.includes(product.id));
    setProducts(updatedProducts);
    setSelectedItems([]);
  };

  return (
    <Container className='Categories'>
        <Container className='CategoriesTotal'>
            <Container className='CategoriesTop'>
      <h1>Categories</h1>
      <div className='Topbuttons'>
     {editingProduct ? (
          <button className='CategoriesUpdatebutton' onClick={handleUpdate}><RxUpdate/></button>
        ) : (
          <button className='CategoriesCreatebutton'  onClick={handleCreate}><VscAdd/></button>
        )}
        <button className='CategoriesDeleteSelectedButton' onClick={handleDeleteSelected}> <AiFillDelete/> </button></div>
    
      
      </Container>
     <Container className='CategoriesInput'>  
     
     <input className='CategoriesInputfield'
          type="text"
          placeholder="Enter Category Name"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
    
    <input
  className='CategoriesInputfield'
  type="text"
  placeholder="Enter SubCategory"
  value={newProduct.subcategory}
  onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
/>
<input
  className='CategoriesInputfield'
  type="text"
  placeholder="Enter Description"
  value={newProduct.description}
  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
/>
        
      
   </Container> 
      <table className='Table'>
        <thead className='Header'>
          <tr className='Tr'>
          <th className='ProductsTh'><input
  type="checkbox"
  checked={selectAll}
  onChange={(e) => handleSelectAll(e.target.checked)}
/>
</th> 
            <th className='Th'>Category</th>
            <th className='Th'>Sub Category</th>
            <th className='Th'>Description</th>
        
            <th className='Th'>Actions</th>
          </tr>
        </thead>
        <tbody>
        {sortedProducts.map((product, index) => (
            <tr className="Tr"key={index}>
              <td className='ProductsTd'>
                        <input
  type="radio"
  checked={selectAll || selectedItems.includes(product.id)}
  onChange={() => handleSelectItem(product.id)}
/>
              </td>
              <td className='Td'>{product.category}</td>
              <td className='Td'>{product.subcategory}</td>
              <td className='Td'>{product.description}</td>
             
              <td className='Td'>
                <Button className='Editbutton' onClick={() => handleEdit(product)}><MdEdit/></Button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table></Container>
    </Container>
  );
}

export default Categories;
