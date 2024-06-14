
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'

function Header (props){ 


      const Navigate = useNavigate()

      const handlelogout = () => {
          localStorage.removeItem('token');
            Navigate('/login');

      }
    return ( 
     <div className='header-container d-flex justify-content-between'>
           
           <div className="header">

           <Link className='links ' to="/">   HOME  </Link>

           <input className='search' 
           type='text' 
           value={props && props.search}
           onChange={(e)=> props.handlesearch && props.handlesearch(e.target.value)

           }/>
           <button className='search-btn' onClick={()=> props.handleClick && props.handleClick()} > SEARCH  </button>
        



          
           </div>
           <div>
           { !!localStorage.getItem('token') && 
           <Link  to="/add-product">
             <button className="logout-btn"> ADD PRODUCT </button> 
              </Link> }
            
           {!localStorage.getItem('token') ?
                <Link to="/login">   LOGIN </Link> :
               <button className='logout-btn'onClick={handlelogout}>  LOGOUT </button> }
           </div>
    </div>
 
         )

}

export default Header;