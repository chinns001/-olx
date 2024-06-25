import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaSearch } from "react-icons/fa";

function Header(props) {
  const Navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
}

let locations = [
      {
        "latitude": 28.6139,
        "longitude": 77.2090,
        "placeName": "Naw Delhi, Delhi"
      },
      {
        "latitude": 19.0760,
        "longitude": 72.8777,
        "placeName": "Mumbai, Maharashtra"
      },

]

  return (
    <div className="header-container d-flex justify-content-between">
      <div className="header">
        <Link className="links" to="/">
          HOME
        </Link>
        <select value=''onChange={(e) => {
          localStorage.setItem('userLoc', e.target.value)
          }}>
           {
            locations.map((item,index)=>{
             return (
                        <option value={`${item.latitude},${item.longitude}`}>
                        { item.placeName }
                        </option>
             )
            })
           }
        </select>
        <input
          className="search"
          type="text"
          value={props && props.search}
          onChange={(e) =>
            props.handlesearch && props.handlesearch(e.target.value)
          }
        />
        <button
          className="search-btn"
          onClick={() => props.handleClick && props.handleClick()}
        >
        
          <FaSearch />{" "}
        </button>
      </div>
      <div>
        {!!localStorage.getItem("token") && (
          <Link to="/add-product">
            <button className="logout-btn"> ADD PRODUCT </button>
          </Link>
        )}

        {!!localStorage.getItem("token") && (
          <Link to="/liked-products">
            <button className="logout-btn"> LIKED PRODUCTS </button>
          </Link>
        )}

        {!localStorage.getItem("token") ? (
          <Link to="/login"> LOGIN </Link>
        ) : (
          <button className="logout-btn" onClick={handlelogout}>
          LOGOUT
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
