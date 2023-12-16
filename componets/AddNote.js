import React, { useContext } from "react";
import NoteContext from "../contest/notes/noteContext";
import { useState } from "react";

const AddNote = (props) => {
      const context = useContext(NoteContext);
      const {addNote} = context;
      const [note,setNote]=useState({title:"",description:"",tag:""})
      const handleClick=(e)=>{
            e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added note succefully","success");
      }
      const onChange=(e)=>{
         setNote({...note , [e.target.name]: e.target.value})
      }


  return (
    <div className="containor my-3">
      <h1>Enter your Info</h1>
      
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control "  id="title" name="title"  aria-describedby="emailHelp"
             value={note.title} onChange={onChange}/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label" > Description </label>
            <input
              type="text"
              className="form-control"
              id="description"  name="description" value={note.description}
               onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" > Tag </label>
            <input
              type="text"
              className="form-control"
              id="tag"  name="tag" value={note.tag}
              onChange={onChange} />
          </div>
          <button  disabled ={note.title.length<5||note.description.length<5||note.tag.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
      
      
    </div>
  );
};

export default AddNote;
