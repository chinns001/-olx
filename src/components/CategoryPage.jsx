import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import "./Home.css";

function CategoryPage() {
  const navigate = useNavigate();

  const param = useParams();
  console.log(param);

  const [products, setproducts] = useState([]);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState("");
  const [issearch, setissearch] = useState(false);

  // useEffect(()  =>  {
  //        if(!localStorage.getItem('token')) {
  //              navigate('/login')

  // }
  // eslint-disable-next-line
  // },    [])

  useEffect(() => {
    const url = "http://localhost:8000/get-products?catName=" + param.catName;
    axios
      .get(url)
      .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  }, [param]);

  const handlesearch = (value) => {
    setsearch(value);
  };

  const handleClick = () => {
    const url = "http://localhost:8000/search?search=" + search;
    axios
      .get(url)
      .then((res) => {
        setcproducts(res.data.products);
        setissearch(true);
      })
      .catch((err) => {
        alert("Server Err.");
      });

    //    let filterProducts = products.filter((item)=>{
    //    if(item.pname.toLowerCase().includes(search.toLowerCase()) ||
    //     item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
    //     item.category.toLowerCase().includes(search.toLowerCase())) {
    //       return item;
    //    }
    // })
    //setcproducts(filterProducts)
  };

  const handleCategory = (value) => {
    let filterProducts = products.filter((item, index) => {
      if (item.category == value) {
        return item;
      }
    });
    setcproducts(filterProducts);
  };
  const handleLike = (productId) => {
    let userId = localStorage.getItem("userId");
    console.log("userId", "productid");

    const url = "http://localhost:8000/like-product";
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert("Liked.");
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  };

  const handleProduct = (id) => {
    navigate("/product/" + id);
  };
  return (
    <div>
      <Header
        search={search}
        handlesearch={handlesearch}
        handleClick={handleClick}
      />
      <Categories handleCategory={handleCategory} />
      {issearch && cproducts && (
        <h5>
          
          SEARCH RESULT
          <button className="clear-btn" onClick={() => setissearch(false)}>
          
            CLEAR
          </button>
        </h5>
      )}
      {issearch && cproducts && cproducts.length == 0 && (
        <h5> No Results Found </h5>
      )}
      {issearch && (
        <div className="d-flex justify-content-center flex-wrap">
          {cproducts &&
            products.length > 0 &&
            cproducts.map((item, index) => {
              return (
                <div key={item._id} className="card m-3">
                  <div
                    onClick={() => handleLike(item._id)}
                    className="icon-con"
                  >
                    <FaHeart lassName="icons" />
                  </div>
                  <img
                    width="500px"
                    height="300px"
                    src={"http://localhost:8000/" + item.pimage}
                  />
                  <p className="m-2">
                    {" "}
                    {item.pname} | {item.category}{" "}
                  </p>
                  <h3 className="m-2 text-danger"> {item.price} </h3>
                  <p className=" m-2 text-success"> {item.pdesc} </p>
                </div>
              );
            })}
        </div>
      )}

      {!issearch && (
        <div className="d-flex justify-content-center flex-wrap">
          {products &&
            products.length > 0 &&
            products.map((item, index) => {
              return (
                <div key={item._id} className="card m-3">
                  <div
                    onClick={() => handleLike(item._id)}
                    className="icon-con"
                  >
                    <FaHeart className="icons" />
                  </div>
                  <img
                    onClick={(id) => handleProduct(item._id)}
                    width="300px"
                    height="200px"
                    src={"http://localhost:8000/" + item.pimage}
                  />
                  <h3 className="m-2 price-text"> $ {item.price} </h3>
                  <p className="m-2">
                    {" "}
                    {item.pname} | {item.category}{" "}
                  </p>
                  <p className=" m-2 text-success"> {item.pdesc} </p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
export default CategoryPage;
