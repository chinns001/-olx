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
        if (res.data.product){
          setproduct(res.data.product)

        }
      
     })
     .catch((err)=>{
      alert('Server Err.')
     })
 
 },    [])


    return (
    <div>
    <Header/>
   bfbgbggbvhvh
    {product && product.pname}
    </div>

)

}

export default ProductDetail;