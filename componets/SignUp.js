import { useState } from "react"
import React  from 'react'
//import { useHistory } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:"" });
 // const history = useHistory();

  const handelsubmit = async (e) => {
    const [name,email,password]=credentials;
    e.preventDefault(); //without this the reload page

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password})

    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      //redirect
     //localStorage.setItem('token', json.authtoken);
     //history.push("/");
     props.showAlert("Succesfully created your Account","Succesful")
    } else {
      props.showAlert("Invalid credentials","Danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className='containor'>
     <form onSubmit={handelsubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/> 
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form> 
    </div>
  )
}

export default SignUp
