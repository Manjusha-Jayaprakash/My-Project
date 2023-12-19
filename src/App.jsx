// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnotherPage from './Anotherpage';
import { Dashboard } from './Dashboard';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component
import Categories from './catalog/Categories';
import Products from './catalog/Products';
import Filters from './catalog/Filters';
import Languageeditor from './design/Languageeditor';
import Layouts from './design/Layouts';
import Themeeditor from './design/Themeeditor';
import Orders from './sales/Orders';
import Recurringorders from './sales/Recurringorders';
import Returns from './sales/Returns';
import Customerapprovals from './customers/Customerapprovals';
import Customergroups from './customers/Customergroups';
import Customer from './customers/Customer';
import Registrationform from './Registrationform';
import Loginpage from './Loginpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registrationform />} />
        <Route path="/admin-login" element={<Loginpage />} />
        <Route path="/admin-login/dashboard" element={<AnotherPage/>} >
        <Route path="/admin-login/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/admin-login/dashboard/catalog/categories" element={<PrivateRoute element={<Categories />} />} />
        <Route path="/admin-login/dashboard/catalog/products" element={<PrivateRoute element={<Products />} />} />
        <Route path="/admin-login/dashboard/catalog/filters" element={<PrivateRoute element={<Filters />} />} />
        <Route path="/admin-login/dashboard/design/layouts" element={<PrivateRoute element={<Layouts />} />} />
        <Route path="/admin-login/dashboard/design/themeeditor" element={<PrivateRoute element={<Themeeditor />} />} />
        <Route path="/admin-login/dashboard/design/languageeditor" element={<PrivateRoute element={<Languageeditor />} />} />
        <Route path="/admin-login/dashboard/sales/orders" element={<PrivateRoute element={<Orders />} />} />
        <Route path="/admin-login/dashboard/sales/recurringorders" element={<PrivateRoute element={<Recurringorders />} />} />
        <Route path="/admin-login/dashboard/sales/returns" element={<PrivateRoute element={<Returns />} />} />
        <Route path="/admin-login/dashboard/customers/customerapprovals" element={<PrivateRoute element={<Customerapprovals />} />} />
        <Route path="/admin-login/dashboard/customers/customergroups" element={<PrivateRoute element={<Customergroups />} />} />
        <Route path="/admin-login/dashboard/customers/customers" element={<PrivateRoute element={<Customer />} />} />
        </Route> </Routes>
    </BrowserRouter>
  );
}

export default App;
