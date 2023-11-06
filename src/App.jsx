
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./Loginpage";
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


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Loginpage/>}></Route>
       <Route path="/anotherpage" element={<AnotherPage/>}>
       <Route exact path="/anotherpage" element={<Dashboard/>} />
            <Route path="/anotherpage/catalog/categories" element={<Categories/>} />
             <Route path="/anotherpage/catalog/products" element={<Products/>} />
             <Route path="/anotherpage/catalog/filters" element={<Filters/>} />
             <Route path="/anotherpage/design/layouts" element={<Layouts/>}/> 
             <Route path="/anotherpage/design/themeeditor" element={<Themeeditor/>} />
             <Route path="/anotherpage/design/languageeditor" element={<Languageeditor/>} />
             <Route path="/anotherpage/sales/orders" element={<Orders/>} />
             <Route path="/anotherpage/sales/recurringorders" element={<Recurringorders/>} />
             <Route path="/anotherpage/sales/returns" element={<Returns/>} />
              
              <Route path="/anotherpage/customers/customerapprovals" element={<Customerapprovals/>} />
              <Route path="/anotherpage/customers/customergroups" element={<Customergroups/>} />
              <Route path="/anotherpage/customers/customers" element={<Customer/>} />
              </Route>
      </Routes>
    </BrowserRouter>
  );
}

