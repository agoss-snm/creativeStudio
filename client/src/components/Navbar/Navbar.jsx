import "./Navbar.css";
import '../../pages/HomePage/HomePage.css'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";


function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="navbar-container">
    <nav>
    <div className="logo">
    <Link to="/">
      <span id='logotype'>Creative Studio</span>
      </Link>
    </div>
    <ul>
      <li className='black'><Link to="/">
          Home
        </Link></li>

        {isLoggedIn && (
          <>
          <li>
            <button onClick={logOutUser}>Logout</button>
            </li>
            <li><Link to="/profile">
              Profile
              {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
            </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li><Link to="/signup">
              {" "}
              Sign Up{" "}
            </Link></li>
            <li><Link to="/login">
              {" "}
              Login{" "}
            </Link></li>
          </>
        )}
    </ul>
    
  </nav>
</div>

  );
}

export default Navbar;
