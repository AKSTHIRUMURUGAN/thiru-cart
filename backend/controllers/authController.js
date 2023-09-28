const catchAsyncError=require("../middleware/CatchAsyncError");
const User=require("../models/userModel");
const sendEmail = require("../utils/email");
const ErrorHandler=require("../utils/errorHandler")
const sendToken=require("../utils/jwt")
const crypto=require("crypto")
//register user
exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const{name, email, password}=req.body

    let avatar;
    if(req.file){
          avatar=`${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
    }
    const user=await User.create({
        name,
        email,
        password,
        avatar
    });
    sendToken(user,201,res)
})
//Login user
exports.loginUser=catchAsyncError(async(req,res,next)=>{
  const{email,password} =req.body;
  if(!email||!password){
    return next(new ErrorHandler("please enteremail&password",400))
  }
  //find the user database
  const user=await User.findOne({email}).select("+password");
  if(!user){
    return next(new ErrorHandler("Invalid email or password",401))
  }
  if(!await user.isValidPassword(password)){
    return next(new ErrorHandler("Invalid email or password",401))
  }
  sendToken(user,201,res)

})
//Logout user
exports.logoutUser=(req,res,next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
  })
  .status(200)
  .json({
    success:true,
    message:"Logged Out"
  })
}
//Forgot Password
exports.forgotPassword = catchAsyncError( async (req, res, next)=>{
  const user =  await User.findOne({email: req.body.email});

  if(!user) {
      return next(new ErrorHandler('User not found with this email', 404))
  }

  const resetToken = user.getResetToken();
  await user.save({validateBeforeSave: false})
  

  //Create reset url
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset url is as follows \n\n 
  ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

  try{
      sendEmail({
          email:
          user.email,
          subject: "Thiru cart Password Recovery",
          message
      })

      res.status(200).json({
          success: true,
          message: `Email sent to ${user.email}`
      })

  }catch(error){
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined;
      await user.save({validateBeforeSave: false});
      return next(new ErrorHandler("not get it",200))
  }

}) 
//Reset Password
exports.resetPassword=catchAsyncError(async(req,res,next)=>{
  const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user=await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire:{
      $gt:Date.now()
    }
  })
  if (!user){
    return next(new ErrorHandler("password reset token is invalid or expired"))
  }
  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("password does not match"))
  }
  user.password=req.body.password;
  user.resetPasswordToken=undefined;
  user.resetPasswordTokenExpire=undefined
  await user.save({validateBeforeSave:false})
  sendToken(user,201,res)
})
//Get user profile
exports.getUserProfile=catchAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.user.id)
  res.status(200).json({
    success:true,
    user
  })
})
//Change Passsword
exports.changePassword=catchAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.user.id).select('password');
  //check old password
  if(!await user.isValidPassword(req.body.oldPassword)){
 return next(new ErrorHandler('Old password is incorret'))

  }
  //assign new password
  user.password=req.body.password;
  await user.save();
  res.status(200).json({
    success:true,
   
  })
})
//update profile
exports.updateProfile=catchAsyncError(async(req,res,next)=>{
 let newUserData={
  name:req.body.name,
  email:req.body.email
 }
 let avatar;
 if(req.file){
  avatar=`${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
  newUserData={...newUserData,avatar}
}
 const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
  new:true,
  runValidators:true,
})
 res.status(200).json({
  success:true,
  user
 })
})
//Admin: GetAll Users
exports.getAllUsers=catchAsyncError(async(req,res,next)=>{
 const users=await User.find();
 res.status(200).json({
  success:true,
  users
 })
})
//Admin: Get Specific User
exports.getUser=catchAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(`user not found with this id: ${req.params.id}`))
  }
  res.status(200).json({
    success:true,
    user
   })
});
//Admin :Update User
exports.updateUser=catchAsyncError(async(req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
   }
   const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true,
  })
   res.status(200).json({
    success:true,
    user
   })
  })
  //Admin:Delete User
  exports.deleteUser=catchAsyncError(async(req,res,next)=>{
    const user=User.findById(req.params.id);
    if(!user){
      return next(new ErrorHandler(`user not found with this id: ${req.params.id}`))
    }
    await user.findOneAndRemove();
    res.status(200).json({
      success:true,
     })
  });