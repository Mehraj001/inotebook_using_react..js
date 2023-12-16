import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesintilal = [];
  const [notes, setNotes] = useState(notesintilal);

  // get all notes
  const getNote = async () => {
    // do API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NTI5YmUwZmY5MzI1ZDZhZDdmMDU4In0sImlhdCI6MTY5OTEyNDExMH0.0h02r83H_NkNkq2sk0aJK6cU9zOy00bff2d3JR4M1B8",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a notes
  const addNote = async (title, description, tag) => {
    // do API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NTI5YmUwZmY5MzI1ZDZhZDdmMDU4In0sImlhdCI6MTY5OTEyNDExMH0.0h02r83H_NkNkq2sk0aJK6cU9zOy00bff2d3JR4M1B8",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);


    const note = {
      _id: "6546a9c1d91aa87814ec0f99",
      user: "654529be0ff9325d6ad7f054",
      title: title,
      description: description,
      tag: tag,
      date: "2023-11-04T20:29:53.275Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //delete a notess
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NTI5YmUwZmY5MzI1ZDZhZDdmMDU4In0sImlhdCI6MTY5OTEyNDExMH0.0h02r83H_NkNkq2sk0aJK6cU9zOy00bff2d3JR4M1B8",
      },
    });
    const json = response.json();
    console.log(json);
    console.log("delete the note of id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a notes
  const editNote = async (id, title, description, tag) => {
    // do API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NTI5YmUwZmY5MzI1ZDZhZDdmMDU4In0sImlhdCI6MTY5OTEyNDExMH0.0h02r83H_NkNkq2sk0aJK6cU9zOy00bff2d3JR4M1B8",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);
   

    let newNotes=JSON.parse(JSON.stringify(notes))
    //logic to edit the note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
