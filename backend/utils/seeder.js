const products=require("../data/products.json");
const product=require("../models/productModel");
const dotenv=require("dotenv");
const connectDatabase=require("../config/database.js");
dotenv.config({path:"backend/config/config.env"});
connectDatabase();
const seedProducts=async()=>{
    try
{    await product.deleteMany();
    console.log("product successfully deleted..")
    await product.insertMany(products);
    console.log("products added successfully..")}
catch(error){
    console.log(error);
}
process.exit();
}
seedProducts()