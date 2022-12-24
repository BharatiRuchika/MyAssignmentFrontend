import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/signup.css";
import { useDispatch,useSelector } from 'react-redux'
import {login,clearErrors} from "./actions/userActions";
import validator from 'validator';
import { useAlert } from 'react-alert'
const Login = ({history}) => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [error,setError] = useState({
        email:"",
        password:""
    })
    const dispatch = useDispatch();
    const alert = useAlert();
    const {isAuthenticated,loading,usererror} = useSelector(state=>state.auth);
    const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  useEffect(()=>{
    if(isAuthenticated){
        alert.success("user logged in successfully");
        history.push("/home");
      }
  })
  
  useEffect(()=>{
    if(usererror){
        alert.error(usererror);
        dispatch(clearErrors());
    }
  },[isAuthenticated,usererror,dispatch,history])
  const submitHandler = async(e) => {
        e.preventDefault();
        if(user.email=="" || user.password==""){
            alert.error("please enter all fields");
            return
        }
        console.log("user",user);
        const formData = new FormData();
        formData.set("email",user.email);
        formData.set("password",user.password);
        dispatch(login(formData))
        // await axios.post("http://localhost:30001/user/login",formData)
    }
    const onChange = (e) => {
        const {name,value} = e.target;
        switch(name){
            
          case "email":{
            if(value.length==0){
              error.email = "email cant be empty";
            }else
            error.email =  validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
            break;
          }
          case "password":{
            if(value.length==0){
              error.password = "Password Number cant be empty";
            }else
            error.password = '';
            break;
          }
    }
    setUser({ ...user, [name]: value });
}
    
    
    return (
        <>
            <div className="signupFrm">
                <form className="form" onSubmit={submitHandler}>
                    <h1 className="title">Sign In</h1>

                    <div className="inputContainer">
                        <input type="text" className="input" name="email" placeholder="enter your email" value={user.email} onChange={onChange} />
                        <label htmlFor="" className="label">Email</label>
                    </div>
                    <span style={{color:'red'}}>{error.email}</span>

                    <div className="inputContainer">
                        <input type="text" className="input" name="password" placeholder="enter your password" value={user.password} onChange={onChange} />
                        <label htmlFor="" className="label">Password</label>
                    </div>
                    <span style={{color:'red'}}>{error.password}</span>
                    <div style={{display:"flex"}}>
                    <div style={{"margin": "10px","padding": "20px"}}> <input type="submit" className="submitBtn" value="Sign In" /></div>
                    <div onClick={()=>history.push("/register")} style={{"margin": "10px","padding": "20px"}}><input type="submit" className="submitBtn" value="Sign Up" /></div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;