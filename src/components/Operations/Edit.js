import React,{useState,useEffect} from "react";
import "../css/signup.css";
import axios from "axios";
import validator from 'validator'
import { useDispatch,useSelector } from 'react-redux'
import {register,editUser,clearErrors} from "../actions/userActions";
import { useAlert } from 'react-alert'
import {UPDATE_PROFILE_RESET} from "../constants/userConstants"
const Edit = ({history}) => {
    const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const dispatch = useDispatch();
    const alert = useAlert();
    const {isAuthenticated,loading,usererror,user,token,success} = useSelector(state=>state.auth);
    console.log("edituser",user);
    const [myuser, setUser] = useState({
        name:user.name,
        username:user.username,
        website:user.website,
        phone:user.phone,
        status:user.status,
    })
    useEffect(() => {
      if(usererror){
          alert.error(usererror);
          dispatch(clearErrors());
      }
   }, [dispatch,alert,isAuthenticated,usererror,history])
    const [error,setError] = useState({
        name:"",
        username:"",
        website:"",
        phone:"",
        status:"",
        cpassword:""
    })
    useEffect(()=>{
      if(success){
        alert.success("user updated successfully");
        dispatch({type:UPDATE_PROFILE_RESET})
          history.push("/");
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
              case "website":{
                if(value.length==0){
                  error.website = "website cant be empty";
                }else
                  error.website = "";
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
          
    }
        setUser({ ...myuser, [name]: value });
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        console.log("target",e.target.name)
        console.log(error[Object.keys(error)[0]]);
        console.log("length",Object.keys(error).length);
        console.log("keys",Object.keys(myuser))
          for(var i=0;i<Object.keys(user).length;i++){
            if(user[Object.keys(myuser)[i]]=="" && Object.keys(myuser)[i]!=="userId"){
              alert.error(Object.keys(myuser)[i]+" cant be empty");
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
        formData.set("name",myuser.name);
        formData.set("username",myuser.username);
        formData.set("website",myuser.website);
        formData.set("phone",myuser.phone);
        formData.set("status",myuser.status);
        dispatch(editUser(formData,token));
    }
    return (
        <>
        <div className="signupFrm">
    <form className="form" onSubmit={submitHandler}>
      <h1 className="title">Edit User</h1>
      <div className="inputContainer">
        <input type="text" className="input" name="name" placeholder="Enter name" value={myuser.name} onChange={onChange}/>
        <label htmlFor="" className="label">name</label>
      </div>
      <span style={{color:'red'}}>{error.name}</span>
      <div className="inputContainer">
        <input type="text" className="input" name="username" placeholder="Enter Username" value={myuser.username} onChange={onChange}/>
        <label htmlFor="" className="label">Username</label>
      </div>
      <span style={{color:'red'}}>{error.username}</span>
      <div className="inputContainer">
        <input type="text" className="input" name="website" placeholder="Enter Website Name" value={myuser.website} onChange={onChange}/>
        <label htmlFor="" className="label">Website</label>
      </div>
      <span style={{color:'red'}}>{error.website}</span>
      <div className="inputContainer">
        <input type="text" className="input" name="phone" placeholder="Enter Phone Number" value={myuser.phone} onChange={onChange}/>
        <label htmlFor="" className="label">Phone</label>
      </div>
      <span style={{color:'red'}}>{error.phone}</span>
      <label htmlFor="cars">Select Status:</label>

<select onChange={onChange} name="status" id="status" value={myuser.status}>
    <option value="Inactive">Inactive</option>
    <option value="active">Active</option>
</select> 

      <input type="submit" className="submitBtn" value="Update"/>
    </form>
  </div>
        </>
    )
}

export default Edit;