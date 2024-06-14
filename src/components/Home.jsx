import { useEffect, useState  } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home(){

   const navigate = useNavigate()

const[products, setproducts ] = useState([]);
   

// useEffect(()  =>  {
//        if(!localStorage.getItem('token')) {
//              navigate('/login')

// }
// eslint-disable-next-line
// },    [])


useEffect(()  =>  {
   const url = 'http://localhost:8000/get-products';
    axios.get(url)
    .then((res)=>{
      console.log(res);
      if (res.data.Products){
         setproducts(res.data.Products);
      }
    })
    .catch((err)=>{
    console.log(err)
     alert('Server Err.')
    })

},    [])
 return (
   
   <div>
     <Header />

    { !!localStorage.getItem('token') && <Link to="/add-product"> ADD PRODUCT </Link> }

             {/* <h2> MY PRODUCTS: </h2> */}
             <div className="d-flex justify-content-center flex-wrap">
             {products && products.length > 0 &&
                 products.map((item, index) => {
                    
                    return (
                       <div className="card m-3">
                        <img width= "500px" height="300px" src={ 'http://localhost:8000/' + item.pimage} />
                      <p className="m-2">  {item.pname} | {item.category} </p>
                      <h3 className="m-2 text-danger">  {item.price} </h3>
                      <p className=" m-2 text-success">  {item.pdesc} </p>
                      </div>
                    )
                    })}

                  </div>
     </div>
)

}
export default Home;