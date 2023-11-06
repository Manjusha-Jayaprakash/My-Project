
import Button from "react-bootstrap/esm/Button";
import {useForm} from "react-hook-form";
import { Container } from 'react-bootstrap';
import './App.css';
import React from "react";
import {useNavigate} from "react-router-dom";


      
export default function Loginpage(){
  const navigate=useNavigate()
    const {
        handleSubmit,
        formState: { errors },
    } = useForm();
        const onSubmit = data => console.log(data);
        console.log(errors);  

       
  
return(
  <Container className="Total">
<Container className="Box">
   
        <Container className="Regpage">
          <h1 className="Login">LOGIN</h1>
          <p className="Info">Please enter your UserName and Password!</p>
        <Container className="Details">
        <form onSubmit={handleSubmit(onSubmit)}>
        
        <input id="Username" placeholder="Enter UserName" />

    
        <input id="Password" placeholder="Enter Password" />
    
       
  
       <Button className="Button" type="submit" onclick={navigate('/Anotherpage')}>LOGIN</Button></form>
        </Container>
        </Container>
    </Container></Container>
  
);
}



