
import { adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest,  deleteOrderSuccess,  orderDeatailSuccess, orderDetailFail, orderDetailRequest, updateOrderFail, updateOrderRequest, updateOrderSuccess, userOrderFail, userOrderRequest, userOrderSuccess } from "../slices/orderSlice";
import axios from "axios"

export const createOrder=order=>async(dispatch)=> {
 try {
    dispatch(createOrderRequest())
    const {data}=await axios.post('/api/v1/order/new',order) 
    dispatch(createOrderSuccess(data))
 } catch (error) {
    dispatch(createOrderFail(error.response.data.message))
 }
}
export const userOrders=async(dispatch) => {
   try {
      dispatch(userOrderRequest())
      const {data}=await axios.get('/api/v1/myorders') 
      dispatch(userOrderSuccess(data))
   } catch (error) {
      dispatch(userOrderFail(error.response.data.message))
   }
  }
  export const orderDetail=id=>async(dispatch) => {
   try {
      dispatch(orderDetailRequest())
      const {data}=await axios.get(`/api/v1/order/${id}`) 
      dispatch(orderDeatailSuccess(data))
   } catch (error) {
      dispatch(orderDetailFail(error.response.data.message))
   }
  }
  export const adminOrders=async(dispatch) => {
   try {
      dispatch(adminOrdersRequest() )
      const {data}=await axios.get('/api/v1/admin/orders') 
      dispatch(adminOrdersSuccess(data))
   } catch (error) {
      dispatch(adminOrdersFail(error.response.data.message))
   }
  }
  export const deleteOrder=id=>async(dispatch) => {
   try {
      dispatch(deleteOrderRequest())
      await axios.delete(`/api/v1/admin/order/${id}`) 
      dispatch(deleteOrderSuccess())
   } catch (error) {
      dispatch(deleteOrderFail(error.response.data.message))
   }
  }
  export const updateOrder=(id,productData)=>async(dispatch)=>{
   console.log(productData)
   try {
    dispatch(updateOrderRequest())
    console.log('ur')
    await axios.put(`/api/v1/admin/order/${id}`,productData)
    console.log('us')
    dispatch(updateOrderSuccess())
    console.log('usf')
   } catch (error) {
    dispatch(updateOrderFail(error.response.data.message))
    console.log('usf')
   }
 }
