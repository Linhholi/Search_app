import "./navbar.css";
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navContainer">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap"/>
            <span className="logo">4CORP</span>
        </div>
        <div className="navItems">
          <Link to='/'><button className="navButton">Home</button></Link>
          <Link to='/customers'><button className="navButton">Find Customers</button></Link>
        
        </div>
    </div>
  )
}

export default Navbar;