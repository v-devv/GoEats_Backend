const Franchise = require("../models/Franchise");
const Product = require("../models/Product");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Unique file name
    }
  });
const upload = multer({storage:storage});
const addProduct = async(req , res)=>{
    try{
        const {productName  , productPrice , productCategory ,bestSeller ,productDescription} = req.body;
        const productImage = req.fieldname ? file.filename: undefined;
        const franchiseId = req.params.franchiseId;
        const franchise = await Franchise.findById(franchiseId);
        if(!franchise){
            return res.status(404).json({message : "Franchise not found"})
        }
        const product = new Product({
            productName , productPrice , productCategory ,bestSeller ,productDescription , productImage , franchise:franchise._id 

        })
        const savedProducts = await product.save();
        /* franchise.products.push(savedProducts); */
        await franchise.save();
        res.status(200).json({message : "Product added successfully" , product : savedProducts})
    }catch(error){
        console.error(error)
        res.status(500).json({message : "Error adding product" , error : error.message})
    }
}

const getProductByFranchise = async(req , res)=>{
    try{
        const franchiseId = req.params.franchiseId
        const franchise = await Franchise.findById(franchiseId);
        if(!franchise){
            return res.status(404).json({message : "Franchise not found"})
        }
        const products = await Product.find({franchise : franchiseId});
        const franchiseName = franchise.franchiseName;
        res.status(200).json({message : "Products found successfully" ,franchiseName, products : products})
    }catch(error){
        console.error(error);
        res.status(500).json({message : "Error getting products" , error : error.message})
    }
}

const deleteProductbyId =async(req , res)=>{
    try{
        const productId = req.params.productId;

        const deleteProduct = await Product.findByIdAndDelete(productId);
        if(!deleteProduct){
            return res.status(404).json({message : "Product not found"})
        }
        res.status(200).json({message : "Product deleted successfully" , deleteProduct})
    }catch{
        console.error(error);
        res.status(500).json({message : "Error deleting product" , error : error.message})
    }
} 



module.exports = {addProduct : [upload.single("productImage") , addProduct] , getProductByFranchise  , deleteProductbyId}