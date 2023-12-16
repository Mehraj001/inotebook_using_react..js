const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");




router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
      res.status(500).send("Internal server error");
  }

});




router.post(
  "/addnote",
  [
    body("title", "enter the valid title").isLength({min: 3,}),
    body("description", "descrption size must be length three").isLength({min: 3,}),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const {title,description,tag}=req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note=new Note({
      title,description,tag,user:req.user.id
    })
    const savenote=await note.save()
    res.json(savenote);
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
  );  


  router.put("/updatenote/:id",fetchUser,async (req, res) => {
     
    const {title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

  let note= await Note.findById(req.params.id);
  if(!note){ return res.status(404).send("Not found")}

  if(note.user.toString() !==req.user.id){ return res.status(401).send("Not Allowed")};
  

  note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note});




  });


  router.delete("/deletenote/:id",fetchUser,async (req, res) => {
     
    const {title,description,tag}=req.body;
   
  let note= await Note.findById(req.params.id);
  if(!note){ return res.status(404).send("Not found")}

  if(note.user.toString() !==req.user.id){ return res.status(401).send("Not Allowed")};
  

  note=await Note.findByIdAndDelete(req.params.id)
  res.json({"succes":"note deleted succesfully",note:note});




  });


module.exports = router;
