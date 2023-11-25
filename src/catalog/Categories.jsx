import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { VscAdd } from 'react-icons/vsc';
import { MdEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    category: '',
    subcategory: '',
    description: '',
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [sortedCategories, setSortedCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();// eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    setSortedCategories([...categories].sort((a, b) => b.id - a.id));
  }, [categories]);
  const handleCreate = async () => {
    try {
      if (newCategory.category && newCategory.subcategory && newCategory.description) {
        if (editingCategory) {
          // If an editingCategory is set, update the existing category
          const response = await fetch(`http://localhost:3002/api/categories/${editingCategory._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
          });

          if (!response.ok) {
            console.error('Failed to update category:', response.statusText);
          }

          setEditingCategory(null);
        } else {
          // If not editing, add a new category
          const response = await fetch('http://localhost:3002/api/categories', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
          });

          if (!response.ok) {
            console.error('Failed to create category:', response.statusText);
          }
        }

        // Clear the form
        setNewCategory({
          category: '',
          subcategory: '',
          description: '',
        });

        fetchData(); // Fetch data after creation/update
      }
    } catch (error) {
      console.error('Error creating/updating category:', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory({ ...category });
    setNewCategory({ ...category });
  };

  const handleUpdate = async () => {
    try {
      if (editingCategory) {
        // If an editingCategory is set, update the existing category
        const response = await fetch(`http://localhost:3002/api/categories/${editingCategory._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCategory),
        });

        if (!response.ok) {
          console.error('Failed to update category:', response.statusText);
        }

        setEditingCategory(null);
        setNewCategory({
          category: '',
          subcategory: '',
          description: '',
        });

        fetchData(); // Fetch data after update
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };
 
  const handleSelectItem = (categoryId) => {
    if (selectedItems.includes(categoryId)) {
      setSelectedItems(selectedItems.filter((id) => id !== categoryId));
    } else {
      setSelectedItems([...selectedItems, categoryId]);
    }
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      const allCategoryIds = sortedCategories.map((category) => category._id);
      setSelectedItems(allCategoryIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      if (selectedItems.length > 0) {
        const userConfirmed = window.confirm('Are you sure you want to delete the selected categories?');

        if (userConfirmed) {
          const deletePromises = selectedItems.map(async (categoryId) => {
            const response = await fetch(`http://localhost:3002/api/categories/${categoryId}`, {
              method: 'DELETE',
            });

            if (!response.ok) {
              console.error(`Failed to delete category ${categoryId}:`, response.statusText);
            }
          });

          await Promise.all(deletePromises);

          fetchData(); // Fetch data after deletion
          setSelectedItems([]);
        }
      }
    } catch (error) {
      console.error('Error deleting categories:', error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/categories?page=${currentPage}&limit=${itemsPerPage}`);
      const data = await response.json();

      if (Array.isArray(data.categories)) {
        setCategories(data.categories);
        setTotalPages(data.totalPages || 1);
      } else {
        console.error('Invalid response format. Expected an array.');
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  return (
    <Container className='Categories'>
      <Container className='CategoriesTotal'>
        <Container className='CategoriesTop'>
          <h1>Categories</h1>
          <div className='Topbuttons'>
            {editingCategory ? (
              <Button className='CategoriesUpdatebutton' onClick={handleUpdate}><RxUpdate /></Button>
            ) : (
              <Button className='CategoriesCreatebutton' onClick={handleCreate}><VscAdd /></Button>
            )}
            <Button className='CategoriesDeleteSelectedButton' onClick={handleDeleteSelected}><AiFillDelete /></Button>
          </div>
        </Container>
        <Container className='CategoriesInput'>
          <input
            className='CategoriesInputfield'
            type="text"
            placeholder="Enter Category Name"
            value={newCategory.category}
            onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
          />
          <input
            className='CategoriesInputfield'
            type="text"
            placeholder="Enter SubCategory"
            value={newCategory.subcategory}
            onChange={(e) => setNewCategory({ ...newCategory, subcategory: e.target.value })}
          />
          <textarea
            className="CategoriesInputfield"
            placeholder="Enter Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          />
        </Container>
        <Container className='CategoriesInput-table'>
          <table className='CategoriesTable'>
            <thead >
              <tr className='CategoriesTr'>
                <th className='CategoriesTh'>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className='CategoriesTh'>S.No</th>
                <th className='CategoriesTh'>Category</th>
                <th className='CategoriesTh'>Sub Category</th>
                <th className='CategoriesTh'>Description</th>
                <th className='CategoriesTh'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCategories.map((category, index) => (
                <tr className="CategoriesTr" key={index}>
                  <td className='CategoriesTd'>
                    <input
                      type="checkbox"
                      checked={selectAll || selectedItems.includes(category._id)}
                      onChange={() => handleSelectItem(category._id)}
                    />
                  </td>
                  <td className='CategoriesTd'>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td className='CategoriesTd'>{category.category}</td>
                  <td className='CategoriesTd'>{category.subcategory}</td>
                  <td className='CategoriesTd'>{category.description}</td>
                  <td className='CategoriesTd'>
                    <Button className='Editbutton' onClick={() => handleEdit(category)}><MdEdit /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
        <div className='Categories-Pagination'>
          <button
            className='Previous-Button'
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          ><GrPrevious/>
            
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className='Next-Button'
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <GrNext/>
          </button>
        </div>
      </Container>
    </Container>
  );
}

export default Categories;