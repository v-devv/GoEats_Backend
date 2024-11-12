
const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotENV = require("dotenv")
dotENV.config()
const secretKey = process.env.WhatIsYourName
const verifyToken = async(req , res , next )=>{
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({message : "You are not authenticated" })
    }
    try{
        const decoded = jwt.verify(token , secretKey)
        const vendor = await Vendor.findById(decoded.vendorId)
        if(!vendor){
            return res.status(404).json({message : "Vendor not found" })
        }
        req.vendorId = vendor._id
        next();
    }catch(error){
        console.log(error)
        return res.status(400).json({message : "Invalid token" })
    }
}
module.exports = verifyToken;