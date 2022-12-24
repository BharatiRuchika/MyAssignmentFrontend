import React from 'react';
import '../../App.css';
import {Route,Link} from "react-router-dom";
import Search from './search';
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import {logoutUser} from "../actions/userActions";

// import "../../App.css";
import '../../App.css'
const Header=()=>{
  const alert = useAlert();
  const dispatch = useDispatch();
//   const { isAuthenticated, loading, usererror } = useSelector(state => state.auth);
  const { user, loading,isAuthenticated } = useSelector(state => state.auth);
  console.log("user",user);
  const logoutHandler = ()=>{
    dispatch(logoutUser());
    alert.success("Logged out Successfully...");
  }
  
    return(
   <>
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
          <img style={{"height":"100px","width":"150px"}} src="/images/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
         <Route render={({history})=><Search history={history}/>}/>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

        {isAuthenticated? (
          <div className="ml-4 dropdown d-inline">
             <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

{/* <figure className="avatar avatar-nav">
    <img
        src={user.avatar && user.avatar.url}
        alt={user && user.name}
        className="rounded-circle"
    />
</figure> */}
<span>{user && user.name}</span>
</Link>
<div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

<Link to="#!" className="dropdown-item">users</Link>
<Link to="#!" className="dropdown-item">Profile</Link>
<Link className="dropdown-item text-danger" onClick={logoutHandler} to="/">
   Logout
</Link>

 
</div>
          </div>
        ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
      </div>
    </nav>

   
   </>)
}
export default Header;