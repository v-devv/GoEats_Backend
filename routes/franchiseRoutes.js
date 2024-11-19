
const express = require("express");
const franchiseController = require("../controllers/franchiseController");
const verifyToken = require("../middlewares/verifyToken");


const router = express.Router();

router.post('/add-franchise' , verifyToken , franchiseController.addFranchise );
router.get('/uploads/:imageName' , (req , res)=>{
    const imageName = req.params.imageName
    res.headersSent('Content-Type' , 'image/jpg')
    res.sendFile(path.join(__dirname , '..' , 'uploads' ,imageName))
})
router.get(':/franchiseId' , franchiseController.deleteFranchisebyId  )

module.exports=router;