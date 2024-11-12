

const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true 
    },
    franchise:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Franchise"
        }
    ]
    
})

/* const Vendor = mongoose.model('Vendor' , vendorSchema);
module.exports = Vendor; */
module.exports = mongoose.model('Vendor' , vendorSchema);
