import React from "react";
import { useState } from "react";
//import { useHistory } from 'react-router-dom';


const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  //const history = useHistory();

  const handelsubmit = async (e) => {
    e.preventDefault(); //without this the reload page

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})

    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      //redirect
     //localStorage.setItem('token', json.authtoken);
     //history.push("/");
     props.showAlert("Logged in succefulyy","Succesful")
    } else {
      props.showAlert("Invalid details","Danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handelsubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"  value={credentials.email} onChange={onChange}
            id="email"
            name="email"
           
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
