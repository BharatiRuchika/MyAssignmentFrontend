import {LOAD_USER_FAIL,LOGOUT_SUCCESS,LOGOUT_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS
    ,LOGIN_FAIL,CLEAR_ERRORS,REGISTER_USER_FAIL,REGISTER_USER_SUCCESS,REGISTER_USER_REQUEST
    ,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAIL,ADD_USER_FAIL,ADD_USER_REQUEST,ADD_USER_SUCCESS,
    DELETE_USER_FAIL,DELETE_USER_REQUEST,DELETE_USER_SUCCESS
} from "../constants/userConstants"

import axios from "axios"
export const register = (userData)=>async(dispatch)=>{
    console.log("im in register");
    try{
      dispatch({
          type:REGISTER_USER_REQUEST
     })
     const config={
        headers:{
            'Content-Type':'application/json'
        }
      }
 const {data} = await axios.post("http://localhost:3001/auth/register",userData,config)
 console.log("registerdata",data);
 
 dispatch({
     type:REGISTER_USER_SUCCESS,
     payload:data
 })
 
    }catch(error){
        console.log("error",error.response);
     dispatch({
         type:REGISTER_USER_FAIL,
         payload:error.response.data.errMessage
     })
    }
 }

 export const login = (userData) => async(dispatch) => {
   
    console.log("im in login");
    try{
      dispatch({
          type:LOGIN_REQUEST
     })
     const config={
        headers:{
            'Content-Type':'application/json'
        }
      }
 const {data} = await axios.post("http://localhost:3001/auth/login",userData,config)
 console.log("logindata",data);
 
 dispatch({
     type:LOGIN_SUCCESS,
     payload:data
 })

   }catch(error){
    console.log("error",error.response);
     dispatch({
         type:LOGIN_FAIL,
         payload:error.response.data.errMessage
     })
   }
 }

 export const addUser = (userData,token)=>async(dispatch)=>{
    console.log("im in add user");
    console.log("userData",userData);
    console.log("token",token);
    try{
        dispatch({
            type:ADD_USER_REQUEST
       })
       const config={
        headers:{
            'Content-Type':'application/json',
            'auth-token':`${token}`
        }
      }
       const {data} = await axios.post("http://localhost:3001/users/addUser",userData,config)
       console.log("userlist",data.users);
 
 dispatch({
     type:ADD_USER_SUCCESS,
     payload:data.users
 })
}catch(error){
        console.log("error",error.response);
        dispatch({
            type:ADD_USER_FAIL,
            payload:error.response.data.errMessage
        })
    }
 }
 export const logoutUser = ()=>async(dispatch)=>{
    try{
        const {data} = await axios.get("http://localhost:3001/auth/logout");
        console.log("data",data);
      dispatch({
          type:LOGOUT_SUCCESS
      })
      }catch(error){
          dispatch({
              type:LOGOUT_FAIL,
              payload:error.response.data.errMessage
          })
         }
    }

export const editUser = (userData,token) => async(dispatch)=>{
    // console.log("im in register");
    console.log("im in update profile")
    console.log("token",token)
    try{
      dispatch({
          type:UPDATE_PROFILE_REQUEST
     })
     const config={
        headers:{
            'Content-Type':'application/json',
            'auth-token':`${token}`
        }
      }
 const {data} = await axios.put("http://localhost:3001/users/edit",userData,config);
 console.log("data",data);
 dispatch({
     type:UPDATE_PROFILE_SUCCESS,
     payload:data.success
 })
 
    }catch(error){
     dispatch({
         type:UPDATE_PROFILE_FAIL,
         payload:error.response.data.errMessage
     })
    }
}
 export const clearErrors = ()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
 }