
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'

function Header (){ 


      const Navigate = useNavigate()

      const handlelogout = () => {
          localStorage.removeItem('token');
            Navigate('/login');

      }
    return ( 
     <div>
           
           <div className="header">

           <Link to="/">   HOME  </Link>

           <input className='search' type='text'/>
           <button> SEARCH </button>

           <span className='mt-3'> SELL & PURCHASE ONLINE ... In Your City. </span> 

           {!localStorage.getItem('token') ?
                <Link to="/login">   LOGIN </Link> :
               <button onClick={handlelogout}>  LOGOUT </button> }

          
           </div>
           
    </div>
 
         )

}

export default Header;