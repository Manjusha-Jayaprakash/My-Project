import { Button,Container } from "react-bootstrap";
import {Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import "./App.css";
import * as MdIcons from "react-icons/md";

export default function Anotherpage(){
  const [showCatalogDropdown, setShowCatalogDropdown] = useState(false);
  const [showDesignDropdown, setShowDesignDropdown] = useState(false);
  const [showSalesDropdown, setShowSalesDropdown] = useState(false);
  const [showCustomersDropdown, setShowCustomersDropdown] = useState(false);

  const toggleCatalogDropdown = () => {
    setShowCatalogDropdown(!showCatalogDropdown);
  };
  const toggleDesignDropdown = () => {
    setShowDesignDropdown(!showDesignDropdown);
  };
  const toggleSalesDropdown = () => {
    setShowSalesDropdown(!showSalesDropdown);
  };
  const toggleCustomersDropdown = () => {
    setShowCustomersDropdown(!showCustomersDropdown);
  };
 
  
    return(
        <Container className="Anotherpage"> 
        <div class="row">
    <div class="col-md-2" className="center"></div>
    <div class="col-md-4 ms-auto" className="rightend">
      <div class="col-md-2" className="demouser"><img src="https://www.ecomdeveloper.com/demo/image/cache/profile-45x45.png" alt="Demo User" className="Demouserimg"/>
      <ul><p className="Demouserdropdown">Demo User <i class="bi bi-caret-down-fill"></i></p></ul>
      </div>
      <div class="col-md-2" className="logout" style={{textDecoration:"none"}}><i class="bi bi-box-arrow-right"></i><Link to="/">Logout</Link>      
      </div>
      </div>
  </div>
        <Container className="LoGo">
        <h1 className="Logo">
          Administration</h1></Container>
        <Container className="Navbar">
        <ul className="Sidebar"><i class="bi bi-list"></i><p className="sideheading">NAVIGATION</p><Button className="CloseButton" >
        <i class="bi bi-x" ></i>
      </Button>
     <li className="List"><Link to="admin-login/dashboard"><i class="bi bi-speedometer2"></i> Dashboard</Link></li>
     <li className="List" onClick={toggleCatalogDropdown }><i class="bi bi-bookmarks"></i> Catalog <i class="bi bi-caret-down-fill" id="Arrow" onClick={toggleCatalogDropdown}></i>
            {showCatalogDropdown && (
              <div className="dropdown">
            <li className="List"><MdIcons.MdOutlineKeyboardDoubleArrowRight/> <Link to="/admin-login/dashboard/catalog/categories">Categories</Link></li>
            <li className="List"><MdIcons.MdOutlineKeyboardDoubleArrowRight/> <Link to="/admin-login/dashboard/catalog/products">Products</Link></li>
            <li className="List"><MdIcons.MdOutlineKeyboardDoubleArrowRight/>  <Link to="/admin-login/dashboard/catalog/filters">Filters</Link></li>
              </div>  )}   </li>
     <li className="List" onClick={toggleDesignDropdown}><i class="bi bi-laptop"></i> Design <i class="bi bi-caret-down-fill" id="Arrow" onClick={toggleDesignDropdown}></i> 
             {showDesignDropdown && (
              <div className="dropdown">
              <li className="List" ><MdIcons.MdOutlineKeyboardDoubleArrowRight/> <Link to="/admin-login/dashboard/design/layouts">Layouts</Link></li>
              <li className="List"> <MdIcons.MdOutlineKeyboardDoubleArrowRight/> <Link to="/admin-login/dashboard/design/themeeditor">Theme Editor</Link></li>
            <li className="List"><MdIcons.MdOutlineKeyboardDoubleArrowRight/> <Link to="/admin-login/dashboard/design/languageeditor">Language Editor</Link></li>
              </div>  )} </li>
     <li className="List" onClick={toggleSalesDropdown}><i class="bi bi-cart-dash-fill"></i> Sales  <i class="bi bi-caret-down-fill" id="Arrow" onClick={toggleSalesDropdown}></i>
             {showSalesDropdown && (
              <div className="dropdown">
                <li className="List"><MdIcons.MdOutlineKeyboardDoubleArrowRight/> <Link to="/admin-login/dashboard/sales/orders"> Orders</Link></li>
              <li className="List"> <MdIcons.MdOutlineKeyboardDoubleArrowRight/> <Link to="/admin-login/dashboard/sales/recurringorders">Recurring Orders</Link></li>
              <li className="List"> <MdIcons.MdOutlineKeyboardDoubleArrowRight/> <Link to="/admin-login/dashboard/sales/returns"> Returns</Link></li>
              </div>  )} </li>
     <li className="List" onClick={toggleCustomersDropdown}><i class="bi bi-person-fill"></i> Customers<i class="bi bi-caret-down-fill" id="Arrow" onClick={toggleCustomersDropdown}></i>
     {showCustomersDropdown && (
              <div className="dropdown">
                <li className="List"><MdIcons.MdOutlineKeyboardDoubleArrowRight/> <Link to="/admin-login/dashboard/customers/customers">  Customers</Link></li>
                <li className="List"><MdIcons.MdOutlineKeyboardDoubleArrowRight/> <Link to="/admin-login/dashboard/customers/customergroups"> Customer Groups</Link></li>
                <li className="List"><MdIcons.MdOutlineKeyboardDoubleArrowRight/>  <Link to="/admin-login/dashboard/customers/customerapprovals"> Customer Approvals</Link></li>
              </div>  )} </li></ul>
        </Container>
        <Container className="Page">
             <Outlet/>
           </Container> 
         </Container>
    )
}