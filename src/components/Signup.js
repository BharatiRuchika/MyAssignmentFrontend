import React,{useState,useEffect} from "react";
import "./css/signup.css";
import axios from "axios";
import validator from 'validator'
import { useDispatch,useSelector } from 'react-redux'
import {register,clearErrors} from "./actions/userActions";
import { useAlert } from 'react-alert'
const Register = ({history}) => {
    const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const [user, setUser] = useState({
        email: "",
        password: "",
        name:"",
        username:"",
        userId:"",
        website:"",
        phone:"",
        status:"Inactive",
        cpassword:""
    })
    const dispatch = useDispatch();
    const alert = useAlert();
    const {isAuthenticated,loading,usererror} = useSelector(state=>state.auth);
    useEffect(() => {
      if(usererror){
          alert.error(usererror);
          dispatch(clearErrors());
      }
   }, [dispatch,alert,isAuthenticated,usererror,history])
    const [error,setError] = useState({
        email: "",
        password: "",
        name:"",
        username:"",
        userId:"",
        website:"",
        phone:"",
        status:"",
       cpassword:""
    })
    useEffect(()=>{
      if(isAuthenticated){
        alert.success("user registered successfully");
          history.push("/home");
      }
    })
    
    const onChange = (e) => {
        console.log("im in onchange");
        console.log("target",e.target.name,e.target.value);
        const {name,value} = e.target;
        switch(name){
            case "name":{
                if(value.length==0){
                  error.name = "name cant be empty";
                }else
                if(value.length<5){
                  error.name = 'name should be atleast 5 charaters long';
                }else{
                  error.name = "";
                }
                break;
              }
        case "username":{
            if(value.length==0){
              error.username = "username cant be empty";
            }else
            if(value.length<5){
              error.username = 'username should be atleast 5 charaters long';
            }else{
              error.username = "";
            }
            break;
          }
          case "email":{
            if(value.length==0){
              error.email = "email cant be empty";
            }else
            error.email =  validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
            break;
          }
          case "phone":{
            if(value.length==0){
              error.phone = "Mobile Number cant be empty";
            }else
            error.phone = '';
            break;
          }
          case "password":{
            if(value.length==0){
              error.password = "password cant be empty";
            }else
            error.password = validator.isStrongPassword(e.target.value, {
              minLength: 8, minLowercase: 1,
              minUppercase: 1, minNumbers: 1, minSymbols: 1
            })?'':"password is weak";
            break;
          }
          case "cpassword":{
            if(value.length==0)
                error.cpassword = "cpassword cant be empty";
            else
                if(user.password!=user.cpassword)
                    error.cpassword = "password and confirm password are not equal";
            else
                error.cpassword=""
        }
    }
        setUser({ ...user, [name]: value });
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        console.log("target",e.target.name)
        console.log(error[Object.keys(error)[0]]);
        console.log("length",Object.keys(error).length);
        console.log("keys",Object.keys(user))
          for(var i=0;i<Object.keys(user).length;i++){
            if(user[Object.keys(user)[i]]=="" && Object.keys(user)[i]!=="userId"){
              alert.error(Object.keys(user)[i]+" cant be empty");
              return 
              }
          }
          for(var i=0;i<Object.keys(error).length;i++){
            if(error[Object.keys(error)[i]]!=""){
              console.log(error[Object.keys(error)[i]])
              alert.error(error[Object.keys(error)[i]])
              return 
            }
          }
        const formData = new FormData();
        formData.set("email",user.email);
        formData.set("password",user.password);
        formData.set("name",user.name);
        formData.set("username",user.username);
        formData.set("userId",user.userId);
        formData.set("website",user.website);
        formData.set("phone",user.phone);
        formData.set("status",user.status);
        dispatch(register(formData));
    }
    return (
        <>
        <div className="signupFrm">
    <form className="form" onSubmit={submitHandler}>
      <h1 className="title">Sign up</h1>
      <div className="inputContainer">
        <input type="text" className="input" name="name" placeholder="Enter name" value={user.name} onChange={onChange}/>
        <label htmlFor="" className="label">name</label>
      </div>
      <span style={{color:'red'}}>{error.name}</span>
      <div className="inputContainer">
        <input type="text" className="input" name="username" placeholder="Enter Username" value={user.username} onChange={onChange}/>
        <label htmlFor="" className="label">Username</label>
      </div>
      <span style={{color:'red'}}>{error.username}</span>
      <div className="inputContainer">
        <input type="text" className="input" name="email" placeholder="Enter Email" value={user.email} onChange={onChange}/>
        <label htmlFor="" className="label">Email</label>
      </div>
      <span style={{color:'red'}}>{error.email}</span>
      <div className="inputContainer">
        <input type="text" className="input" name="password" placeholder="Enter Password" value={user.password} onChange={onChange}/>
        <label htmlFor="" className="label">Password</label>
      </div>
      <span style={{color:'red'}}>{error.password}</span>
      <div className="inputContainer">
        <input type="text" className="input" name="cpassword" placeholder="Confirm password" value={user.confirmpassword} onChange={onChange}/>
        <label htmlFor="" className="label">Confirm Password</label>
      </div>
      <span style={{color:'red'}}>{error.cpassword}</span>
      <div className="inputContainer">
        <input type="text" className="input" name="website" placeholder="Enter Website Name" value={user.website} onChange={onChange}/>
        <label htmlFor="" className="label">Website</label>
      </div>
      <span style={{color:'red'}}>{error.website}</span>
      <div className="inputContainer">
        <input type="text" className="input" name="phone" placeholder="Enter Phone Number" value={user.phone} onChange={onChange}/>
        <label htmlFor="" className="label">Phone</label>
      </div>
      <span style={{color:'red'}}>{error.phone}</span>
      <label htmlFor="cars">Select Status:</label>

<select onChange={onChange} name="status" id="status" value={user.status}>
    <option value="Inactive">Inactive</option>
    <option value="active">Active</option>
</select> 

      <input type="submit" className="submitBtn" value="Sign up"/>
    </form>
  </div>
        </>
    )
}

export default Register;