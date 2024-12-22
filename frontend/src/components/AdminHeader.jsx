import React from 'react'
import {Navbar,Nav,Container,NavDropdown,Badge} from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import {FaSignInAlt,FaSignOutAlt} from 'react-icons/fa'

function AdminHeader() {
  return  (
    <div>
      <header>
      <Navbar bg='light' variant='light'  expand='lg' collapseOnSelect >
            <Container>
                <LinkContainer  to='/' >
                <Navbar.Brand >Admin Auth</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                  
                       
                   
                        <>
                        <LinkContainer to='/login'>
                        <Nav.Link >
                            <FaSignInAlt/> Sign In
                        </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/register'>
                        <Nav.Link >
                        <FaSignOutAlt/> Sign Up
                        </Nav.Link>
                        </LinkContainer>
                        </>
                   
                      
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
      </header>
    </div>
  )
}

export default AdminHeader
