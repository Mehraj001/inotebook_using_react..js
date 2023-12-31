import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Home from "./componets/Home";
import About from "./componets/About";
import NoteState from "./contest/notes/NoteState";
import Alert from "./componets/Alert";
import Login from "./componets/Login";
import SignUp from "./componets/SignUp";
import { useState } from "react";

function App() {
  const [alert,setAlert]=useState(null);
const showAlert=(message,type)=>{
setAlert({
  msg:message,
  type:type
})
setTimeout(()=>{
  setAlert(null);
},3000 );
}
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert  alert={alert}/>
        <Routes>
          <Route exact path="/home" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
