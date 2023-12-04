import React, { useState, useEffect } from 'react';
import './Customer.css';
import { AiFillDelete } from 'react-icons/ai';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const itemsPerPage = 10;
  
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users?page=${currentPage}&limit=${itemsPerPage}&sort=desc`);
      const data = await response.json();
  
      if (Array.isArray(data.users)) {
    
        const sortedCustomers = data.users.sort((a, b) => b._id.localeCompare(a._id));
  
        setCustomers(sortedCustomers);
        setTotalPages(data.totalPages || 1);
      } else {
        console.error('Invalid response format. Expected an array.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();// eslint-disable-next-line
  }, [currentPage]);
  const handleDelete = async () => {
    if (selectedCustomers.length === 0) {
      // Handle case when no customer is selected
      return;
    }
  
    const userConfirmed = window.confirm('Are you sure you want to delete the selected customers?');
  
    if (!userConfirmed) {
      // User canceled the deletion
      return;
    }
  
    console.log('Deleting selected customers:', selectedCustomers.map(customer => customer._id));
  
    try {
      // Assuming your server supports deleting multiple customers in one request
      const deletePromises = selectedCustomers.map(async (customer) => {
        const response = await fetch(`http://localhost:3001/api/deleteCustomer/${customer._id}`, {
          method: 'DELETE',
        });
  
        console.log(`Delete response for customer ${customer._id}:`, response);
  
        if (!response.ok) {
          console.error(`Failed to delete customer ${customer._id}:`, response.statusText);
        }
      });
  
      // Wait for all delete requests to complete
      await Promise.all(deletePromises);
  
      fetchData();  // Fetch data after deletion
      setSelectedCustomers([]);
      setSelectAll(false); // Clear selected customers after deletion
    } catch (error) {
      console.error('Error deleting customers:', error);
    }
  };
  

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedCustomers([...customers]);
    } else {
      setSelectedCustomers([]);
    }
  };

  const toggleSelectCustomer = (customer) => {
    const isSelected = selectedCustomers.some((selectedCustomer) => selectedCustomer._id === customer._id);
    if (isSelected) {
      setSelectedCustomers(selectedCustomers.filter((selectedCustomer) => selectedCustomer._id !== customer._id));
    } else {
      setSelectedCustomers([...selectedCustomers, customer]);
    }
  };


  return (
    <div className="Customer">
      <div className="Customer-Totalpage">
        <div className="Customer-Top">
          <h1 style={{ marginLeft: '20px' }}>Customers</h1>
          <button
            className='Customer-commondeletebutton'
            onClick={handleDelete}
          >
<AiFillDelete/></button>
        </div>
        <table className="Customer-Table">
          <thead>
            <tr className="Customer-Tr">
              <th className="Customer-Th">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </th>
              <th className="Customer-Th">S.No</th>
              <th className="Customer-Th">Name</th>
              <th className="Customer-Th">Email</th>
              <th className="Customer-Th">Contact Number</th>
              <th className="Customer-Th">Password</th>
              <th className="Customer-Th">City</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td className='Customer-Td'>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.some((selectedCustomer) => selectedCustomer._id === customer._id)}
                    onChange={() => toggleSelectCustomer(customer)}
                  />
                </td>
                <td className='Customer-Td'>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td className="Customer-Td">{customer.Fullname}</td>
                <td className="Customer-Td">{customer.EmailID}</td>
                <td className="Customer-Td">{customer.ContactNumber}</td>
                <td className="Customer-Td">{customer.Password ? customer.Password.replace(/./g, '*') : ''}</td>
                <td className="Customer-Td">{customer.City}</td>
              </tr>
            ))}
          </tbody>
        </table>
         <div className="Customer-Pagination">
          <button className='Previous-Button'
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          ><GrPrevious />
          
          </button>
          <span> {`Page ${currentPage} of ${totalPages}`}</span>
          <button className='Next-Button'
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
           <GrNext />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Customer;
