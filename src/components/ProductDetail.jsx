import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function ProductDetail() {
  const [product, setproduct] = useState();

  const p = useParams();
  console.log(p.productId);

  useEffect(() => {
    const url = "http://localhost:8000/get-product/" + p.productId;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        if (res.data.products) {
          setproduct(res.data.products);
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  }, []);

  return (
    <>
      <Header />
      PRODUCT DETAILS :
      <div>
        
        {product && (
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <img
                width="500px"
                height="400px"
                src={"http://localhost:8000/" + product.pimage}
                alt=""
              />
               {product.pimage2 && <img
                width="500px"
                height="400px"
                src={"http://localhost:8000/" + product.pimage2}
                alt=""
              /> }
              
              <h6> Product Details : </h6>
              {product.pdesc}
            </div>
            <div>
              <h3 className="m-2 price-text"> $ {product.price} </h3>
              <p className="m-2">{product.pname} | {product.category}</p>
              <p className=" m-2 text-success"> {product.pdesc} </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
