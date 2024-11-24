
const mongoose = require("mongoose");
const Franchise = require("./Franchise");

const productSchema = new mongoose.Schema({
    productName : {
        type: String,
        required: true
    },
    productDescription : {
        type: String,
        required: true
    },
    productPrice : {
        type: String,
        required: true
    },
    productImage : {
        type: String
    },
    productCategory : {
        type : [
            {
                type:String,
                enum : ['veg' , 'non-veg']
            }
        ]
    },
    bestSeller: { type: Boolean },
    franchise : [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Franchise'
    }]

})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;