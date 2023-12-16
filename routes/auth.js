const express = require("express");
const User = require("../models/User");
const bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "mehrajgoodboy";
const router = express.Router(); // module for router
const { body, validationResult } = require("express-validator"); //module of validation npm
const { useId } = require("react");
const fetchUser = require("../middleware/fetchUser");

//create a user using //localhost//api/auth.createuser
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    //if there are error ,then return bad request error 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      //check the user exit or not in your database
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({success, errors: "Soory this email is already exit" });
      }
      //crete a new user 
     const Salt=await bcrypt.genSalt(10);
     const secpass=await bcrypt.hash(req.body.password,Salt);

      user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: secpass,
      });

      const data={
        user:{
        id:user.id
        }
      }
      const autotoken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success, autotoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some erroe occured");
    }
  });

  router.post(
    "/login",
    [
      body("email",'Enter a valid email').isEmail(),
      body("password",'enter the correct password').exists(),
    ],
    async (req, res) => {
      //if there are error ,then return bad request error 
      let success=false;
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        
        return res.status(400).json({ errors: errors.array() });
      }

      const {email,password}=req.body;
      try {
        let user =await User.findOne({email:email});
      
      if (!user) {
        success=false;
        return res
          .status(400)
          .json({ errors: "Please try to correct eamil" });
      }
      const passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare){
          success=false;
        return res
          .status(400)
          .json({ success,errors: "Please try to correct eamil" });
      }
      const data={
        user:{
        id:user.id
        }
      }
      const autotoken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,autotoken});
      } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal server error");
      }


    })

    
    //Get loggin useer detail by using ;Post/api/auth/getuser
    router.post("/getuser", fetchUser, async (req, res) => {
       try {
        const userId=req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
       } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal server error");
       }

      })

module.exports = router;
