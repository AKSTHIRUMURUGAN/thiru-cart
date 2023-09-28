import { createSlice } from "@reduxjs/toolkit";


const orderSlice=createSlice({
    name:'order',
    initialState:{
        orderDetail:{},
        userOrders:[] ,
        adminOrders:[],
        loading:false,
        isOrderDeleted:false,
        isOrderUpdated:false
    },   
    reducers:{
        createOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        createOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                orderDetail:action.payload.order
            }

        },
        createOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        clearOrderError(state,action){
            return{
              ...state,
              error:null
            }

        },
        clearError(state,action){
            return{
              ...state,
              error:null
            }

        },
        userOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        userOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                userOrders:action.payload.orders
            }

        },
        userOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        orderDetailRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        orderDeatailSuccess(state,action){
            return{
                ...state,
                loading:false,
                orderDetail:action.payload.order
            }

        },
        orderDetailFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        adminOrdersRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        adminOrdersSuccess(state,action){
            return{
                ...state,
                loading:false,
                adminOrders:action.payload.orders
            }

        },
        adminOrdersFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        deleteOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        deleteOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                isOrderDeleted:true
            }

        },
        deleteOrdersFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        updateOrdersRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        updateOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                orderStatus:action.payload.orderStatus,
                isOrderUpdated:true
            }

        },
        updateOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        },
        clearOrderDeleted(state,action){
            return{
                ...state,
                isOrderDeleted:false
            }

        },
        clearOrderUpdated(state,action){
            return{
                ...state,
                isOrderUpdated:false
            }

        },
    }

});
const{actions,reducer}=orderSlice;
export const{
 createOrderRequest,
 createOrderSuccess,
 createOrderFail,
 clearOrderError,
 userOrderRequest,
 userOrderSuccess,
 userOrderFail,
 orderDetailRequest,
 orderDeatailSuccess,
 orderDetailFail,
 adminOrdersRequest,
 adminOrdersSuccess,
 adminOrdersFail,
 deleteOrderRequest,
 deleteOrderSuccess,
 deleteOrderFail,
 updateOrderRequest,
 updateOrderSuccess,
 updateOrderFail,
 clearOrderDeleted,
 clearOrderUpdated,clearError
     
}=actions;
export default reducer;