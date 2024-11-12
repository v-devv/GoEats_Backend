
const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post('/add-product/:franchiseId' , productController.addProduct);
router.get('/:franchiseId/products' , productController.getProductByFranchise );
router.get('/uploads/:imageName' , (req , res)=>{
    const imageName = req.params.imageName
    res.headersSent('Content-Type' , 'image/jpg')
    res.sendFile(path.join(__dirname , '..' , 'uploads' ,imageName))
})
router.delete(':/productId' , productController.deleteProductbyId);

module.exports = router;