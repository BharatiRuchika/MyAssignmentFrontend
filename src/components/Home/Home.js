import React, { useEffect, useState } from "react";
import '../css/home.css';
import axios from "axios";
import { useDispatch,useSelector } from 'react-redux';
import Header from "../Layout/Header";


import { useAlert } from "react-alert";
const Home = ({history}) => {
	const {isAuthenticated,token} = useSelector(state=>state.auth)
	const [users, setUsers] = useState([]);
	console.log("user",users);
	// console.log("userListSuccess",userListSuccess)
	const alert = useAlert();
	const dispatch = useDispatch();
	useEffect(() => {
		async function getUsers() {
			console.log("im in get user");
			const config={
				headers:{
					'Content-Type':'application/json',
					'auth-token':`${token}`
				}
			  }
			var {data} = await axios.get("http://localhost:3001/users/getUsers",config);
			console.log("users", data);
			setUsers(data.users);
		}
		getUsers();
	}, [])

	const editUser = () => {
		history.push('/edit');
		// dispatchEvent()
		// if(isAuthenticated){
		// 	history.push('/edit');
		// }else{
		// 	alert.error("please login first to edit the user")
		// }
	}
	const addUser = () => {
		history.push('/add');
	}
	const deleteUser = () => {

	}
	const viewUser = () => {

	}
	return (
		<>		

		{isAuthenticated?<button onClick={addUser} className="button" type="button">Add User</button>:<></>}
			{users.length!=0 &&
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="main-box clearfix">
							<div className="table-responsive">
								<table className="table user-list">
									<thead>
										<tr>
											<th><span>UserId</span></th>
											<th><span>User</span></th>
											<th><span>Created</span></th>
											<th className="text-center"><span>Status</span></th>
											<th><span>Email</span></th>
											<th><span>Website</span></th>
											<th><span>Phone</span></th>
											<th>&nbsp;</th>
										</tr>
									</thead>
									<tbody>
										{users && users.map((user) => {
											return (

												<tr key={user.userId}>
													<td>{user.userId}</td>
													<td>
														<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
														<a href="#" className="user-link">{user.name}</a>
														<span className="user-subhead">{user.username}</span>
													</td>
													<td>
														{new Date().toLocaleDateString("de-DE")}
													</td>
													<td className="text-center">
														<span>{user.status}</span>
													</td>
													<td>
														<a href="#">{user.email}</a>
													</td>
													<td>
														<a href="#">{user.website}</a>
													</td>
													<td className="text-center">
														{/* <a href="#">{user.phone}</a> */}
														<span >{user.phone}</span>
													</td>
													<td style={{ "width": "20%" }}>
														<a href="#" className="table-link" onClick={viewUser}>
															<span className="fa-stack" >
																<i className="fa fa-square fa-stack-2x"></i>
																<i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
															</span>
														</a>
														<a href="#" className="table-link" onClick={editUser}>
															<span className="fa-stack">
																<i className="fa fa-square fa-stack-2x"></i>
																<i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
															</span>
														</a>
														<a href="#" className="table-link danger" onClick={deleteUser}>
															<span className="fa-stack">
																<i className="fa fa-square fa-stack-2x"></i>
																{/* <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i> */}
																<i className="fa fa-trash-o" aria-hidden="true"></i>
															</span>
														</a>
													</td>
												</tr>

											)
										})}

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
}
			{/* {users.map((item)=>{
              
          })} */}


		</>
	)
}

export default Home;
