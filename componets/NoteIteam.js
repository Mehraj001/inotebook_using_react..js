import React, { useContext } from "react";
import NoteContext from "../contest/notes/noteContext";
const NoteIteam = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote} = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted succefully","success");}}></i>
          <i className="fa-sharp fa-solid fa-pen-to-square mx-5" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteIteam;
