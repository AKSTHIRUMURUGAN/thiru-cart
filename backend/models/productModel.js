const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the product name."],
        trim:true,
        maxLength:[100,"prodect name cant exceed 100 words"]
    },
    price:{
        type:Number,
        default:0.0
    },
    description:{
        type:String,
        required:[true,"please enter product description."]
    },
    ratings:{
        type:String,
        default:0
    },
    images:[
       { image:{
            type:String,
            required:[true,"please upload product image"]
        }}
    ],
    category:{
        type:String,
        require:[true,"please enter product category"],
        enum:{
            values:[
                "Electronics",
                "Technology",
                "Toys",
                "Mens Wear",
                "Mobile Phones",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Cloths/Shoes",
                "Beauty/Fashions",
                "Sports",
                "Outdoor",
                "Home"
            ],message:"please select correct category"
        }
    },
    seller:{
        type:String,
        required:[true,"please enter seller information"]
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxLength:[20,"product stock can't exceed 20"]      
    },
    noOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        rating:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})
let schema=mongoose.model('product',productSchema)
module.exports=schema;