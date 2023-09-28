const mongoose=require("mongoose")
const dotenv=require("dotenv");
const path= require("path");
dotenv.config({path:path.join(__dirname,"config.env")})
const connectDatabase=()=>{
    mongoose.connect(process.env.DB_LOCAL_URI ,{
        useNewUrlParser:true,
        useUnifiedTopology:true})
    .then(con=>{console.log(`mongo db is connected to the host ${con.connection.host}`)})
    }   
module.exports=connectDatabase;