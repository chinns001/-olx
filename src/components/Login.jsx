import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";

function Login (){
   const Navigate = useNavigate()
   
  
   const [username ,setusername ] = useState('');
   const [password ,setpassword ] = useState('');



   const handleApi = () => {
      const url = 'http://localhost:8000/login';
      const data = { username, password };
      axios.post(url, data)
          .then((res) => {
           if(res.data.message)  {
         alert(res.data.message);
         if(res.data.token){
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            Navigate('/');
         }
  
         }
     })
  
     .catch((err) => {
      alert('SERVER ERR')
  
    })
  }
  
 return (
    <div>
       <Header />
        Welcome to login page
        <br></br>
        USERNAME
        <input type="text" value={username} 
        onChange={(e) => {
         setusername(e.target.value)
        }}  />
        <br></br>
        PASSWORD
        <input type="text" value={password}
        onChange={(e) => {
         setpassword(e.target.value)
        }}  />
        <br></br>
        <button  onClick={handleApi} > LOGIN </button>
        <Link to="/signup">  SIGNUP </Link>

    </div>

 )

}
export default Login;