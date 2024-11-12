
const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotENV = require("dotenv");

dotENV.config();
const secretKey = process.env.WhatIsYourName;



const VendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await Vendor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });
    await newVendor.save();
    res.status(201).json({ message: "Vendor register successfully!!" });
    console.log("registered");
  } catch(error) {
    console.log(error);
    res.status(500).json({ error: "Error in registration" });
  }
};

const vendorLogin = async (req, res) => {
  const {email , password} = req.body
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password , vendor.password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token =jwt.sign({vendorId : vendor._id} , secretKey , {expiresIn : "1h"})

    res.status(200).json({success: " Login successfully" , token});
    console.log(email ,"this is token", token);
  }catch(error){
    console.log(error);
    res.status(500).json({ error: "Error in login" });
  }
}

const getAllVendors = async(req , res)=>{
  try{
    const vendors = await Vendor.find().populate('franchise');
    res.json({vendors});
  }catch(error){
    console.log(error);
    res.status(500).json({error: "Internal server error"})
  }
}

// get single vendor by using ID
const getVendorById = async (req, res) => {
  const vendorId = req.params.id; 
  try {
    const vendor = await Vendor.findById(vendorId).populate('franchise');
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.status(200).json({vendor})
  } catch (error) {
    console.log(error);
    res.status(500).json({error: " Internal server error"});
  }
}



module.exports = {VendorRegister , vendorLogin , getAllVendors , getVendorById };
