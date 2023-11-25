
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AnotherPage from "./Anotherpage";
import { Dashboard} from "./Dashboard";
import Categories from "./catalog/Categories";
import Products from "./catalog/Products";
import Filters from "./catalog/Filters";
import Languageeditor from "./design/Languageeditor";
import Layouts from "./design/Layouts";
import Themeeditor from "./design/Themeeditor";
import Orders from "./sales/Orders";
import Recurringorders from "./sales/Recurringorders";
import Returns from "./sales/Returns";
import Customerapprovals from "./customers/Customerapprovals";
import Customergroups from "./customers/Customergroups";
import Customer from "./customers/Customer";
import Registrationform from "./Registrationform.jsx";
import Loginpage from "./Loginpage.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Registrationform/>}/>
       <Route path="/admin-login" element={<Loginpage/>}/>
       <Route path="/" element={<AnotherPage/>}>
       <Route exact path="/admin-login/dashboard" element={<Dashboard/>} />
            <Route path="/admin-login/dashboard/catalog/categories" element={<Categories/>} />
             <Route path="/admin-login/dashboard/catalog/products" element={<Products/>} />
             <Route path="/admin-login/dashboard/catalog/filters" element={<Filters/>} />
             <Route path="/admin-login/dashboard/design/layouts" element={<Layouts/>}/> 
             <Route path="/admin-login/dashboard/design/themeeditor" element={<Themeeditor/>} />
             <Route path="/admin-login/dashboard/design/languageeditor" element={<Languageeditor/>} />
             <Route path="/admin-login/dashboard/sales/orders" element={<Orders/>} />
             <Route path="/admin-login/dashboard/sales/recurringorders" element={<Recurringorders/>} />
             <Route path="/admin-login/dashboard/sales/returns" element={<Returns/>} />
              <Route path="/admin-login/dashboard/customers/customerapprovals" element={<Customerapprovals/>} />
              <Route path="/admin-login/dashboard/customers/customergroups" element={<Customergroups/>} />
              <Route path="/admin-login/dashboard/customers/customers" element={<Customer/>} />
              </Route>
      </Routes>
    </BrowserRouter>
  );
}

