
const Franchise = require("../models/Franchise");
const Vendor = require("../models/Vendor");
const multer = require('multer');
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

const addFranchise = async (req, res) => {
  try {
    console.log(req.body);  // Debug form data
    console.log(req.file);  // Debug uploaded file

    const { franchiseName, area, category, region, offer } = req.body;
    const franchiseLogo = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(400).json({ message: "Vendor not found" });
    }
    if(vendor.franchise.length > 0){
      return res.status(400).json({message : "One Vendor can have only one franchise"})
    }
    const franchise = new Franchise({
      franchiseName,
      area,
      category,
      region,
      offer,
      franchiseLogo,
      vendor: vendor._id,
    });

    const savedFranchise = await franchise.save();
    const franchiseId = savedFranchise._id;
    vendor.franchise.push(savedFranchise);
    await vendor.save();

    console.log(savedFranchise); // Debug database entry
    return res.status(200).json({ message: "Franchise added successfully", savedFranchise ,franchiseId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding franchise", error: error.message });
  }
};

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