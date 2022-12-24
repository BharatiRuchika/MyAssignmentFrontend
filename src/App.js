import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Edit from './components/Operations/Edit';
import View from './components/Operations/View';
import Login from './components/Login';
import Register from './components/Signup';
import { useSelector } from 'react-redux';
import Landing from './components/Home/Landing';
import Add from "./components/Operations/Add"
// import ProtectedRoute from './components/route/ProtectedRoute';
import { Route,Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Header from './components/Layout/Header';
function PrivateRoute({ path, component: Comp }) {
  console.log(localStorage.getItem("token"));
  const { isAuthenticated, user, loading } = useSelector(state => state.auth);
  console.log("privateauthenticated",isAuthenticated);
  return (<Route exact path={path} render={(props) => {
    
    return isAuthenticated ? <Comp {...props} /> : <Redirect to={"/login"}></Redirect>
  }} />)
}
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Header />
      <Route path="/" component={Landing} exact />
      <PrivateRoute path="/home" component={Home} exact />
      <PrivateRoute path="/edit" component={Edit} exact />
      <PrivateRoute path="/view" component={View} exact />
      <PrivateRoute path="/add" component={Add} exact />
      <Route path="/login" component={Login} exact></Route>
      <Route path="/register" component={Register} exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
