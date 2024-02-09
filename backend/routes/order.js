const express=require("express");
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/authenticate");
const router=express.Router();
router.route('/order/new').post(newOrder);
router.route('/order/:id').get(getSingleOrder)
router.route('/myorders').get(myOrders);

//Admin Routes
router.route("/admin/orders").get(authorizeRole('admin'),orders)
router.route("/admin/order/:id").put(authorizeRole('admin'),updateOrder)
                          .delete(authorizeRole('admin'),deleteOrder)
module.exports=router;
