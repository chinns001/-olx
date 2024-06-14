import { useEffect, useState  } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
function Home(){

   const navigate = useNavigate()

const[products, setproducts ] = useState([]);
const[cproducts, setcproducts ] = useState([]);
const[search, setsearch ] = useState(''); 
   

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
      if (res.data.Products){
         setproducts(res.data.Products);
      }
    })
    .catch((err)=>{
     alert('Server Err.')
    })

},    [])


const handlesearch = (value) => {
setsearch(value);

}

const handleClick =() => {
let filterProducts = products.filter((item)=>{
   if(item.pname.toLowerCase().includes(search.toLowerCase()) ||
    item.pdesc.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())) {
      return item;
   }
})
 setcproducts(filterProducts)



}

const handleCategory = (value) => {
   let filterProducts = products.filter((item, index) => {
      if( item.category == value ) { 
         return item;
      }
   })
    setcproducts(filterProducts)


}
const handleLike =(productId) =>{
   let userId = localStorage.getItem('userId')
   console.log('userId'  , "productid", userId )

   const url = 'http://localhost:8000/like-product';
   const data = { userId , productId }
   axios.post(url, data)
   .then((res) => {
      console.log(res);

   })
  .catch((err)=>{
  alert('Server Err.')
  })
 


}

 return (
   
   <div>
     <Header  search ={search} handlesearch={handlesearch} handleClick = {handleClick}/>
     <Categories handleCategory={handleCategory} />
<h5>  SEARCH RESULT </h5>
    <div className="d-flex justify-content-center flex-wrap">
             {cproducts && products.length > 0 &&
                 cproducts.map((item, index) => {
                    
                    return (
                       <div key={item._id} className="card m-3">
                        <div onClick={() => handleLike(item._id)} className="icon-con"> 
                       <FaHeart  className="icons"/> 
                         </div>
                        <img width= "500px" height="300px" src={ 'http://localhost:8000/' + item.pimage} />
                      <p className="m-2">  {item.pname} | {item.category} </p>
                      <h3 className="m-2 text-danger">  {item.price} </h3>
                      <p className=" m-2 text-success">  {item.pdesc} </p>
                      </div>
                    )
                    })}

                  </div>

                  <h5> ALL RESULTS </h5>
             <div className="d-flex justify-content-center flex-wrap">
             {products && products.length > 0 &&
                 products.map((item, index) => {
                    
                    return (
                       <div key={item._id} className="card m-3">
                         <div  onClick={() => handleLike(item._id)} className="icon-con"> 
                              <FaHeart className="icons"/> 
                         </div>
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