import "./Navbar.css";
import '../../pages/HomePage/HomePage.css'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
//bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';


function Navbarr() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <>
    <Navbar expand={false} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="/">Creative AI Studio</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand"
          aria-labelledby="offcanvasNavbarLabel-expand"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand">
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul>
              <li className='black'>
                <Link to="/">Home</Link>
              </li>
              <li className='black'>
                <Link to="/elements">Elements</Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li>
                    <button onClick={logOutUser}>Logout</button>
                  </li>
                  <li>
                    <Link className='black' to="/profile">Profile</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className='black' to="/signup">Sign Up</Link>
                  </li>
                  <li>
                    <Link  className='black' to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
</>
  );
}

export default Navbarr;
