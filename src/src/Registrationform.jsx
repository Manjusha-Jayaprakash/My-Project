import "./Registrationform.css";
import React, { useState,useEffect }from 'react';
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import {useForm} from "react-hook-form";
export default function Registrationform(){
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();
        
        console.log(errors);    

        const cityAreas = {
          'Coimbatore': ['Gandhipuram', 'R.S.Puram', 'Peelamedu'],
          'Chennai': ['Adyar', 'Ambathur', 'Avadi'],
          'Tiruchy': ['K.K.nagar', 'Kaveri Nagar', 'Uraiyur'],
          
        };

        const [message, setMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
 
          const [selectedCity, setSelectedCity] = useState(''); // State to store selected city
          const [selectedArea, setSelectedArea] = useState(''); // State to store selected area
          const areas = cityAreas[selectedCity] || []; // Get areas for the selected city
        
          const handleCityChange = (e) => {
            const city = e.target.value;
            setSelectedCity(city);
            setSelectedArea(''); // Reset selected area when city changes
          };
          
          const handleAreaChange = (e) => {
            const area = e.target.value;
            setSelectedArea(area);
          };
          
          
          const [uploadedImage, setUploadedImage] = useState(null);

          const handleFileChange = (e) => {
              const file = e.target.files[0];
              if (file && file.size <= 500 * 1024 * 1024) { // 500 MB in bytes
                  setUploadedImage(URL.createObjectURL(file));
              } else {
                  alert("Please select a file below or equal to 500MB.");
                  e.target.value = null; // Reset the input field
              }
          };
          const onSubmit = async (data) => {
       
            try {
              const response = await fetch("http://localhost:3001/api/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  Fullname: data.Fullname,
                  EmailID: data.EmailID,
                  Password: data.Password,
                  Photo: uploadedImage,
                  Gender: data.Gender,
                  dob: data.dob,
                  City: selectedCity,
                  Area: selectedArea,
                  ContactNumber: data.ContactNumber,
                }),
              });
              
          
              if (response.ok) {
                console.log(data);
                setMessage("Your registration has been successfully submitted!!!");
                setShowSuccessMessage(true);
              } else {
                console.error("Error submitting registration:", response.status);
                setMessage("Error submitting registration. Please try again.");       }
            } catch (error) {
              console.error("Error during registration:", error);
              setMessage("Error during registration. Please try again.");
            }
          };
          useEffect(() => {
            if (showSuccessMessage) {
              // Clear the success message after 2 minutes
              const timeoutId = setTimeout(() => {
                setShowSuccessMessage(false);
                window.location.reload();
              }, 8000); // 2 minutes in milliseconds
        
              // Cleanup the timeout when the component unmounts or when showSuccessMessage changes
              return () => clearTimeout(timeoutId);
            }
          }, [showSuccessMessage]);
        
        


  
return(
    <Container className="Registrationpage">          
    
    <Container className="Success-message">
        {showSuccessMessage && (
          <p className={message.includes("successfully") ? "Success" : "Error"}>
            {message}
          </p>
        )}
      </Container>
        <Container className="Regpage-container">REGISTRATION PAGE
        <Container className="Reg-Details">
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>Full Name : </label>
        <input className="Fullname" {...register('Fullname', {
      required: true,
      validate: {
        minLength: (v) => v.length >= 5,
        matchPattern: (v) => /^[a-zA-Z _]+$/.test(v),
      }    })} />

    {errors.Fullname?.type === "required" && (
        <p className="Error">*Full Name is required</p>
      )}
    
      {errors.Fullname?.type === "minLength" && (
        <p className="Error">*Fullname should have at least 5 characters</p>
      )}
    
      {errors.Fullname?.type === "matchPattern" && (
        <p className="Error">*Fullname must contain only letters </p>
      )}
      
        <label>Email ID :    </label>
        <input className="EmailID" {...register('EmailID', {
      required: true,
      validate: {
        matchPattern: (v) => /^[a-zA-Z @.0-9_]+$/.test(v),
      },
    })} />
    {errors.EmailID?.type === "required" && (
        <p className="Error">*Email ID is required</p>
      )}
      {errors.EmailID?.type === "matchPattern" && (
        <p className="Error">*Please enter the valid EmailID </p>
      )}
<label>Contact No:</label>
<input className="ContactNumber" {...register('ContactNumber', {
    required: true,
    validate: {
      matchPattern: (v) => /^\d{10}$/.test(v),
    },
})} />
{errors.ContactNumber?.type==="required"&&(
    <p className="Error">*Phone Number is required</p>
)}
{errors.ContactNumber?.type==="matchPattern"&&(
    <p className="Error">*Please enter a valid 10-digit phone number</p>
)}
        <label>Password : </label>
        <input
  className="Password" type="password"
  {...register('Password', {
    required: true,
    validate: {
      minLength: (v) => v.length >= 5,
      matchPattern: (v) => /^[a-zA-Z0-9!@#$%^&*{6,16}]+$/.test(v),
    },
  })}
  
/>
{errors.Password?.type === "required" && (
  <p className="Error">*Password is required</p>
)}
{errors.Password?.type === "minLength" && (
  <p className="Error">*Password should have a minimum length of 5 characters</p>
)}

    <label>Confirm Password:</label>
    <input className="ConfirmPassword" type="password"{...register('ConfirmPassword', {
    required: true,
    validate: {
        matchesPreviousPassword: (value) => {
            const { Password } = getValues();
            return value === Password || "Passwords do not match";
        }
    }
})}  />
{errors.ConfirmPassword?.type==="required" && (
    <p className="Error">*Confirm Password is required</p>
)}
{errors.ConfirmPassword?.type==="matchesPreviousPassword" && (
    <p className="Error">*Passwords do not match </p>
)}
<label>Gender: </label>
      <input className="Gender-Male" type="radio" {...register('Gender', {
      required: true 
    })} value="Male" />Male
     <input className="Gender-Female" type="radio" {...register('Gender', {
      required: true
    })} value="Female"/>Female
{errors.Gender?.type === "required" && (
        <p className="Error">*Gender is required</p>
      )}
      <br></br>
<label>Date of Birth:</label>
<input className="Dateofbirth"
    type="date"
    {...register('dob', {
        required: true,
    })}
/>
{errors.dob?.type==="required" && (
    <p className="Error">*Date of birth is required</p>
)}

<label>City:</label>
<select className="City" value={selectedCity} onChange={handleCityChange}>
  <option value="">Select a city</option>
  {Object.keys(cityAreas).map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ))}
</select>
<label>Area:</label>
<select className="Area" value={selectedArea} onChange={handleAreaChange}>
  <option value="">Select an area</option>
  {areas.map((area) => (
    <option key={area} value={area}>
      {area}
    </option>
  ))}
</select>



        <label>Photo:</label>
        {uploadedImage && <img src={uploadedImage} className="Image"alt="Uploaded" style={{ width: "100px", height: "100px" }} />}
            <input className="Photo" type="file" onChange={handleFileChange} accept="image/*" />

         
       <Button className="Submitbutton" type="submit">SUBMIT</Button></form>
        </Container>
        </Container>
    </Container>
);
}