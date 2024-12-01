const Franchise = require("../models/Franchise");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
  });
const upload = multer({storage:storage});
const addProduct = async (req, res) => {
    try {
      const { productName, productPrice, productCategory, productDescription } = req.body;
     
      const bestSeller = req.body.bestSeller === "true" 

      const productImage = req.file ? req.file.filename : undefined;
      const franchiseId = req.params.franchiseId;
  
      // Find the franchise by ID
      const franchise = await Franchise.findById(franchiseId);
      if (!franchise) {
        return res.status(404).json({ message: "Franchise not found" });
      }

      const product = new Product({
        productName,
        productPrice,
        productCategory,
        bestSeller, 
        productDescription,
        productImage,
        franchise: franchise._id
      });
  
      const savedProducts = await product.save();
      franchise.products.push(savedProducts) 
      await franchise.save()
  
      res.status(200).json({ message: "Product added successfully", savedProducts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding  product", error: error.message });
    }
  };
  

const getProductByFranchise = async(req , res)=>{
    try{
        const franchiseId = req.params.franchiseId
        const franchise = await Franchise.findById(franchiseId);
        if(!franchise){
            return res.status(404).json({message : "Franchise not found"})
        }
        const products = await Product.find({franchise : franchiseId});
        const franchiseName = franchise.franchiseName;
        res.status(200).json({message : "Products found successfully" ,franchiseName, products})
    }catch(error){
        console.error(error);
        res.status(500).json({message : "Error getting products" , error : error.message})
    }
}

const deleteProductbyId =async(req , res)=>{
    try{
        const productId = req.params.productId;
        console.log("Deleting product with ID:", productId);
        const deleteProduct = await Product.findByIdAndDelete(productId);
        if(!deleteProduct){
            return res.status(404).json({message : "Product not found"})
        }
        res.status(200).json({message : "Product deleted successfully" })
    }catch(error){
        console.error(error);
        res.status(500).json({message : "Error deleting product" , error : error.message})
    }
} 



module.exports = {addProduct : [upload.single("productImage") , addProduct] , getProductByFranchise  , deleteProductbyId}