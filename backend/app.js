const express=require("express");
const app=express()
const products =require('./routes/product')
const auth =require('./routes/auth')
const order=require("./routes/order")
const payment=require("./routes/payment")
const errorMiddleware=require("./middleware/error")
const cookieParser=require("cookie-parser")
const path=require('path')
const dotenv=require("dotenv");
dotenv.config({path:path.join(__dirname,"config/config.env")})
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/api/v1/',products)
app.use('/api/v1/',auth)
app.use('/api/v1/',order)
app.use('/api/v1/',payment)
app.use(errorMiddleware)
module.exports= app;