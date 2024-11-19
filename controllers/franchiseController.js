
const Franchise = require("../models/Franchise");
const Vendor = require("../models/Vendor");
const multer = require('multer');
const path = require("path")

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

const addFranchise = async(req , res)=>{
    try {
    const { franchiseName , area , category ,region ,offer } = req.body;
    const franchiseLogo = req.file?req.file.filename:undefined;
    const vendor = await Vendor.findById(req.vendorId);
    if(!vendor){
        return res.status(400).json({message:"Vendor not found"}) 
    }
    const franchise = new Franchise({
        franchiseName , area , category ,region ,offer ,franchiseLogo , vendor : vendor._id
    });
    const savedFranchise = await franchise.save();
    vendor.franchise.push(savedFranchise);
    await vendor.save();

    return res.status(200).json({message:"franchise add successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
const deleteFranchisebyId =async(req , res)=>{
  try{
      const franchiseId = req.params.franchiseId;

      const deleteProduct = await Franchise.findByIdAndDelete(franchiseId);
      if(!deleteProduct){
          return res.status(404).json({message : "Product not found"})
      }
      res.status(200).json({message : "Product deleted successfully" , deleteProduct})
  }catch{
      console.error(error);
      res.status(500).json({message : "Error deleting product" , error : error.message})
  }


}
module.exports = {addFranchise: [upload.single('franchiseLogo') , addFranchise] , deleteFranchisebyId}