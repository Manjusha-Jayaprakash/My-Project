import React, { useState } from 'react';
import "./Customer.css"

function AdminPanel() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', location: '' });
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleCreate = () => {
    if (newCustomer.name && newCustomer.email && newCustomer.location) {
        const timestamp = Date.now();
        setCustomers([...customers, { ...newCustomer, timestamp }]);
      setNewCustomer({ name: '', email: '', location: '' });
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  const handleUpdate = () => {
    const updatedCustomers = customers.map((customer) =>
      customer === editingCustomer ? { ...editingCustomer } : customer
    );
    setCustomers(updatedCustomers);
    setEditingCustomer(null);
  };
  
  const handleDelete = (customer) => {
    const updatedCustomers = customers.filter((c) => c !== customer);
    setCustomers(updatedCustomers);
  };
  const sortedCustomers = [...customers].sort((a, b) => b.timestamp - a.timestamp);
  return (
    <div className='Customer'>
      <div className='Total'>
      <div className='Top'>
        <h1 style={{marginLeft:"20px"}}>Customers</h1>
      </div>
      <div className='Input'>
        Name:
        <input className='Inputfield'
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
        />
        Email:
        <input className='Inputfield'
          type="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
        />
        Location:
        <input className='Inputfield'
          type="text"
          placeholder="Location"
          value={newCustomer.location}
          onChange={(e) => setNewCustomer({ ...newCustomer, location: e.target.value })}
        />
        {editingCustomer ? (
          <button onClick={handleUpdate} className='Updatebutton'>Update</button>
        ) : (
          <button onClick={handleCreate} className='Createbutton'>Create</button>
        )}
      </div>
      <table className='Table'>
        <thead >
          <tr className='Tr'>
            <th className='Th'>Name</th>
            <th className='Th'>Email</th>
            <th className='Th'>Location</th>
            <th className='Th'>Actions</th>
          </tr>
        </thead>
        <tbody>
        {sortedCustomers.map((customer, index) => (
            <tr key={index}>
              <td className='Td'>{customer.name}</td>
              <td className='Td'>{customer.email}</td>
              <td className='Td'>{customer.location}</td>
              <td>
                <button className="Editbutton" onClick={() => handleEdit(customer)}>Edit</button>
                <button className="Deletebutton" onClick={() => handleDelete(customer)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default AdminPanel;
