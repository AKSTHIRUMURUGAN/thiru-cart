import axios from "axios";
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSuccess } from "../slices/ProductsSlice";

import { createReviewFail, createReviewRequest, createReviewSuccess, deleteProductFail, deleteProductRequest, deleteProductSuccess, newProductFail, newProductRequest, newProductSuccess, productFail, productRequest, productSuccess, updateProductFail, updateProductRequest, updateProductSuccess } from "../slices/productSlice";
export const getProducts=(keyword,price,category,rating,currentPage)=>async(dispatch)=>{
   
   try {
    dispatch(productsRequest())
    let link = `https://thiru-cart.onrender.com/api/v1/products?page=${currentPage}`
    if(keyword){
      link+=`&keyword=${keyword}`
    }
    if(price){
      link+=`&price[gte]=${price[0]}&price[lte]=${price[1]}` 
    }
    if(category){
      link+=`&category=${category}`
    }
    if(rating){
      link+=`&ratings=${rating}`
    }
    const {data}=await axios.get(link)
    dispatch(productsSuccess(data))
   } catch (error) {
    dispatch(productsFail(error.response.data.message))
   }
}

export const getProduct= id =>async(dispatch)=>{
   
   try {
    dispatch(productRequest())
    const { data }=await axios.get(`https://thiru-cart.onrender.com/api/v1/product/${id}`)
    dispatch(productSuccess(data))
   } catch (error) {
    dispatch(productFail(error.response.data.message))
   }
}
export const createReview= reviewData =>async(dispatch)=>{
   
  try {
   dispatch(createReviewRequest())
   const config ={
    headers:{
      'Content-type': 'application/json'
    }
   }
   const { data }=await axios.put(`https://thiru-cart.onrender.com/api/v1/review`,reviewData,config)
   dispatch(createReviewSuccess(data))
  } catch (error) {
   dispatch(createReviewFail(error.response.data.message))
  }
}
export const getAdminProducts=async(dispatch)=>{
   
  try {
   dispatch(adminProductsRequest())
   const {data}=await axios.get(`https://thiru-cart.onrender.com/api/v1/admin/products`)
   dispatch(adminProductsSuccess(data))
  } catch (error) {
   dispatch(adminProductsFail(error.response.data.message))
  }
}
export const createNewProduct=productData=>async(dispatch)=>{
   
  try {
   dispatch(newProductRequest() )
   const {data}=await axios.post(`https://thiru-cart.onrender.com/api/v1/admin/product/new`,productData)
   dispatch(newProductSuccess(data))
  } catch (error) {
   dispatch(newProductFail(error.response.data.message))
  }
}
export const deleteProduct=id=>async(dispatch)=>{
   
  try {
   dispatch(deleteProductRequest() )
   await axios.delete(`https://thiru-cart.onrender.com/api/v1/admin/product/${id}`)
   dispatch(deleteProductSuccess())
  } catch (error) {
   dispatch(deleteProductFail(error.response.data.message))
  }
}
export const updateProduct=(id,productData)=>async(dispatch)=>{
   
  try {
    console.log(productData)
   dispatch(updateProductRequest())
   const {data}=await axios.put(`https://thiru-cart.onrender.com/api/v1/admin/product/${id}`,productData)
   dispatch(updateProductSuccess(data))
  } catch (error) {
   dispatch(updateProductFail(error.response.data.message))
  }
}
