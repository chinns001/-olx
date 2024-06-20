import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function ProductDetail(){
    const [product, setproduct ] = useState()

const p =useParams()
console.log(p.productId)


useEffect(()  =>  {
    const url = 'http://localhost:8000/get-product/' + p.productId ;
     axios.get(url)
     .then((res) => {
        console.log(res)
        if (res.data.products){
          setproduct(res.data.products)

        }
      
     })
     .catch((err)=>{
      alert('Server Err.')
     })
 
 },    [])


    return (
    <div>
    <Header/>
   PRODUCT DETAILS :
        { product && <div>
      <div> 
          <img src={'http://localhost:8000/' + product.pimage} alt=""/>
          </div>
         <div>
         {product.pname}
         </div>      
       </div>}
    
    
    
    </div>





)

}

export default ProductDetail;