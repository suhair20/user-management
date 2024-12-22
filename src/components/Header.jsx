import React from 'react'
import {Navbar,Nav,Container,NavDropdown,Badge} from "react-bootstrap"
import {FaSignInAlt,FaSignOutAlt} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

function Header() {

  const {userInfo}=useSelector((state)=>state.auth)

  const navigate=useNavigate()
  const dispatch=useDispatch()

   const [logoutApiCall]=useLogoutMutation();
  const logoutHandeler=async()=>{
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/') 

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <header>
  <Navbar className='bg-blue' variant='dark'  expand="lg" collapseOnSelect>
    <Container className="d-flex justify-content-between align-items-center">
      <LinkContainer to="/">
        <Navbar.Brand className="text-center ">Mern Auth</Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" className="btn-sm" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {userInfo ? (
            <>
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandeler}>Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaSignInAlt /> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>
                  <FaSignOutAlt /> Sign Up
                </Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
</header>

    </div>
  )
}

export default Header
