import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Home(){

   const navigate = useNavigate()
   const [products, setproducts ] = useState([]);

   

useEffect(()  =>  {
if(!localStorage.getItem('token')) {
      navigate('/login')

}

},    [])

useEffect(()  =>  {
   const url = 'http://localhost:8000/get-products';
   axios.get(url)
   .then((res)  => {
      console.log(res);
      if(res.data.products) {
         setproducts(res.data.products);

      }

     })
    .catch((err) => {
console.log(err);
alert('Server Err.')

    })

   
   },    [])



 return (
   
   <div>
    <Header/>
<Link to="/add-product"> ADD PRODUCT  </Link>

<h2> MY PRODUCTS :</h2>
{products && products.length > 0 &&
products.map(()=>{

   return (
      <div className="card">
         jkfdjjgdkgd
         </div>
   )
})}





    </div>

)

}
export default Home;