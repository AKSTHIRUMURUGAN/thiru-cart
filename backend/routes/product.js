const express=require("express");
const multer=require("multer");
const path=require('path')
const {getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts}= require("../controllers/productController");
const router=express.Router();
const {isAuthenticatedUser, authorizeRole}=require("../middleware/authenticate")
const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path( 'https://thiru-cart.onrender.com/uploads/product' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })
router.route('/products').get(getProducts);
router.route('/product/:id')
                            .get(getSingleProduct);
                           
                            
router.route('/review').put(createReview);
router.route('/reviews').get(getReviews);
router.route('/review').delete(deleteReview);
//admin  routes                      
router.route('/admin/product/new').post(authorizeRole("admin"),upload.array('images'), newProduct);   
router.route('/admin/products').get(authorizeRole("admin"),getAdminProducts); 
router.route('/admin/product/:id').delete(authorizeRole("admin"),deleteProduct);  
router.route('/admin/product/:id').put(authorizeRole("admin"),upload.array('images'),updateProduct);                     
module.exports=router;
