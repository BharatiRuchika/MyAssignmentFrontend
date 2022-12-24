import React,{useState,useEffect} from "react";
import "../css/signup.css";
import axios from "axios";
import validator from 'validator'
import { useDispatch,useSelector } from 'react-redux'
import {register,editUser,clearErrors,addUser} from "../actions/userActions";
import { useAlert } from 'react-alert'
import {UPDATE_PROFILE_RESET} from "../constants/userConstants"
import {ADD_USER_RESET} from "../constants/userConstants";
const Edit = ({history}) => {
    const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const dispatch = useDispatch();
    const alert = useAlert();
    const {isAuthenticated,token,userListSuccess,addusererror} = useSelector(state=>state.auth);
    
    // console.log("edituser",user);
    const [user, setUser] = useState({
        name:"",
        username:"",
        email:"",
        website:"",
        phone:"",
        status:"Inactive",
        userId:0
    })
    useEffect(() => {
      if(addusererror){
          alert.error(addusererror);
          dispatch(clearErrors());
      }
   }, [dispatch,alert,isAuthenticated,addusererror,history])
    const [error,setError] = useState({
        name:"",
        username:"",
        website:"",
        phone:"",
        status:"",
        cpassword:""
    })
    useEffect(()=>{
      
      if(userListSuccess){
		console.log("im in userListSuccess",userListSuccess)
        alert.success("User Added Successfully")
		dispatch({type:ADD_USER_RESET});
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
        formData.set("name",user.name);
        formData.set("username",user.username);
        formData.set("website",user.website);
        formData.set("phone",user.phone);
        formData.set("status",user.status);
        formData.set("email",user.email);
        formData.set("userId",user.userId);
        dispatch(addUser(formData,token));
    }
    return (
        <>
        <div className="signupFrm">
    <form className="form" onSubmit={submitHandler}>
      <h1 className="title">Add User</h1>
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

      <input type="submit" className="submitBtn" value="Add"/>
    </form>
  </div>
        </>
    )
}

export default Edit;