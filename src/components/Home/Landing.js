import { useEffect } from "react";

const Landing = () => {
    useEffect(()=>{
        console.log("im in landing")
    })
   return (
    <>
    <h1>Login to see user list</h1>
    <div style={{"backgroundColor": `url("https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__480.jpg")`,
    "backgroundRepeat": "no-repeat, repeat",
    "backgroundColor": "#cccccc"}}></div></>
   )
}
export default Landing;