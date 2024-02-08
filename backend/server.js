const app=require("./app");
const connectDatabase = require("./config/database");
connectDatabase()
const path=require('path')
const dotenv=require("dotenv");
dotenv.config({path:path.join(__dirname,"config/config.env")})

const server=app.listen(process.env.PORT,()=>{console.log(`server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)})
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err}`)
    console.log("shutting down the server due to unhandle rejection")
    server.close(()=>{
        process.exit(1)
    })
})

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err}`)
    console.log("shutting down the server due to uncaught exception error")
    server.close(()=>{
        process.exit(1)
    })
})
