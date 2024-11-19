

const mongoose = require("mongoose");

const franchiseShema = new mongoose.Schema({
    franchiseName:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:[
            {
                type:String,
                enum : ['veg' , 'non-veg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum : ['north-indian' , 'south-indian' , 'chinese' , 'bakery']
            }
        ]
    },
    offer:{
        type:String,

    },
    franchiseLogo:{
        type:String,
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'vendor'
        }
    ],
    products: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        }
    ]


});


/* const Franchise = mongoose.model('Franchise',franchiseShema);
module.exports = Franchise; */
module.exports = mongoose.model("Franchise", franchiseShema);