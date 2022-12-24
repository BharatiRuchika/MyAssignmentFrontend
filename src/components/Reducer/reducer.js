import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS,LOGOUT_SUCCESS,LOGOUT_FAIL,REGISTER_USER_SUCCESS,REGISTER_USER_REQUEST,
    REGISTER_USER_FAIL,UPDATE_PROFILE_FAIL,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_RESET,ADD_USER_REQUEST,ADD_USER_SUCCESS,
    ADD_USER_FAIL,DELETE_USER_REQUEST,DELETE_USER_FAIL,DELETE_USER_SUCCESS,ADD_USER_RESET
}from "../constants/userConstants"
const initialState = {
    user:{},
    userList:[]
}

export default function authReducer (state=initialState,action)  {
    console.log("im here",action.payload,action.type)
     switch(action.type){
        case LOGIN_REQUEST:
            return {...state,loading:true,isAuthenticated:false}
        case LOGIN_SUCCESS:
            console.log("im here");
            return {...state,loading:false,isAuthenticated:true,user:action.payload.user,token:action.payload.token}
        case LOGIN_FAIL:
            return {...state,loading:false,isAuthenticated:false,user:null,usererror:action.payload,token:null}
        case REGISTER_USER_REQUEST:
            return {...state,loading:true,isAuthenticated:false}
        case REGISTER_USER_SUCCESS:
            return {...state,loading:false,isAuthenticated:true,user:action.payload.user,token:action.payload.token}
        case REGISTER_USER_FAIL:
            return {...state,loading:false,isAuthenticated:false,user:null,usererror:action.payload,token:null}
        case LOGOUT_SUCCESS:
            return {loading:false,isAuthenticated: false,user : null,token:null}
        case LOGOUT_FAIL:
            return {...state,error: action.payload}
        case UPDATE_PROFILE_REQUEST:
            return {...state,loading:true}
        case UPDATE_PROFILE_SUCCESS:
            return {...state,user:action.payload,loading:false,success:true}
        case UPDATE_PROFILE_FAIL:
            return {...state,loading:false,error:action.payload}
        case UPDATE_PROFILE_RESET:
            return {...state,success:false}
        case ADD_USER_REQUEST:
            return {...state,loading:true}
        case ADD_USER_SUCCESS:
            console.log("im in add user success");
            console.log("payload",action.payload);
            return {...state,loading:false,userList:action.payload,userListSuccess:true}
        case ADD_USER_FAIL:
            return {...state,loading:false,addusererror:action.payload}
        case ADD_USER_RESET:
            return {...state,userListSuccess:false}
        case DELETE_USER_REQUEST:
            return {...state,loading:true}
        case DELETE_USER_SUCCESS:
            return {...state,loading:false,userList:action.payload}
        case DELETE_USER_FAIL:
            return {...state,loading:false,error:action.payload}
        case CLEAR_ERRORS:
            return {...state,usererror:null}
        default:return state
     }
}

