const express = require("express");
const dotENV = require("dotenv");
const mongoose = require("mongoose")
const vendorRoutes = require("./routes/vendorRoutes")
const app = express();
const bodyParser = require("body-parser");
const franchiseRoutes = require("./routes/franchiseRoutes")
const productRoutes = require("./routes/productRoutes");
const path = require("path");
const cors = require("cors");



const PORT = process.env.PORT || 4000;

dotENV.config()


app.use(cors());
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected successfully "))
.catch((error)=>console.log(error));
app.use(bodyParser.json())
app.use('/vendor' , vendorRoutes)
app.use('/franchise' , franchiseRoutes);
app.use('/product' , productRoutes );
app.use('/uploads', express.static('uploads'));


app.listen(PORT ,()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})

