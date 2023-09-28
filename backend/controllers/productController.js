const Product=require("../models/productModel")
const ErrorHandler=require("../utils/errorHandler")
const CatchAsyncError=require("../middleware/CatchAsyncError")
const APIFeatures=require("../utils/apiFeautres")
exports.getProducts=CatchAsyncError(async (req,res,next)=>{
    const resPerPage=3;
   let buildQuery=()=>{
    return new APIFeatures(Product.find(),req.query).search().filter()
   }
   const filteredProductsCount=await buildQuery().query.countDocuments({})
    
    const totalProductsCount=await Product.countDocuments({});
    let productsCount=totalProductsCount;
    if(filteredProductsCount!== totalProductsCount){
        productsCount=filteredProductsCount
    }
    const products= await buildQuery().paginate(resPerPage).query;
    if(!products){
    return next(new ErrorHandler('Unable to send Product',400))}
    res.status(200).json({
        success :true,
        count:productsCount,
        resPerPage,
        products
    })
})
exports.newProduct=CatchAsyncError(async(req,res,next)=>{
let images=[]
if(req.files.length>0){
    req.files.forEach(file=>{
        let url= `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`
        images.push({image:url})
    })
}
req.body.images =images;
 req.body.user=req.user.id
 const product= await Product.create(req.body);
 res.status(201).json({
    success:true,
    product
})
})
exports.getSingleProduct=CatchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id).populate('reviews.user','name email');
    if(!product){
    return next(new ErrorHandler("product not found ",400))
    }
    res.status(201).json({
        success:true,
        product
      })
})
exports.updateProduct=CatchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    let images=[]
    if(req.body.imagesCleared === 'false'){
        images=product.images
    }
if(req.files.length>0){
    req.files.forEach(file=>{
        let url= `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`
        images.push({image:url})
    })
}
req.body.images =images;
    if(!product){
        return res.status(404).json({
            success:false,
            message:"product not found"
          });
      }
    product= await Product.findByIdAndUpdate(req.params.id,req.body,{
    new: true,
    runValidators:true

   })
   res.status(201).json({
    success:true,
    product
   })
})
exports.deleteProduct=CatchAsyncError(async(req,res,next)=>{
    const product = await Product.findByIdAndRemove(req.params.id);
    if(!product) {
        return next(new ErrorHandler(`product not found with this id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true
    })
})
//Create Review
exports.createReview=CatchAsyncError(async(req,res,next)=>{
    const {productId,rating,comment}=req.body;
    const review={
        user:req.user.id,
        rating,
        comment
    }
    const product=await Product.findById(productId);
    const isReviewed= product.reviews.find(review=>{
        return review.user.toString()==req.user.id.toString()
    })
    if(isReviewed){
          product.reviews.forEach(
            review=>{
                if(review.user.toString()==req.user.id.toString()){
                    review.comment=comment
                    review.rating=rating
                }
            }
          )
    }
    else{
        product.reviews.push(review);
        product.noOfReviews=product.reviews.length;
    }
    product.ratings=product.reviews.reduce((acc,review)=>{
        return review.rating+acc;
    },0)/product.reviews.length;
    product.ratings=isNaN(product.ratings)?0:product.ratings;
    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success: true
    })
})
//Get Reviews
exports.getReviews=CatchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    if(!product) {
        return next(new ErrorHandler(`no reviews in this id`, 404))
    }
    res.status(200).json({
        success: true,
        reviews:product.reviews
    })
})
//Delete Revie
exports.deleteReview=CatchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    const reviews=product.reviews.filter(review=>{
      return  review._id.toString()!==req.query.id.toString() })
    const noOfReviews=reviews.length;
    let ratings=reviews.reduce((acc,review)=>{
        return review.rating+acc;
    },0)/product.reviews.length;
    ratings=isNaN(product.ratings)?0:ratings;
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        noOfReviews,
        ratings
    })
    res.status(200).json({
        success: true,
    })
})
//get admin products- /api/v1/admin/products
exports.getAdminProducts=CatchAsyncError(async(req,res,next)=>{
   const products= await Product.find();
   res.status(200).send({
    success:true,
    products
   })

})