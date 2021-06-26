import React from 'react'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'


const Navigation = (props) => {


    return (
        <div >
            {/* <nav className={"navigation"}>
                <div className={"navigation-heading rounded-pill px-3"}>
                    CovidFix
                </div>
                <div className={"navigation-items"}>
                    <ul className={"navigation-item"}>
                        <li className={"navigation-item-link mr-1"}><a href={"/health"}>Health</a></li>
                        <li className={"navigation-item-link ml-4 navigation-active"}><a href={"/vaccine"}>Vaccine</a></li>
                    </ul>
                </div>
            </nav> */}
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#">TogetherDo</Navbar.Brand>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Link >
                            Add Task
                        </Nav.Link>
                        <NavDropdown title="Login/SignUp" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Login</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action4">SignUp</NavDropdown.Item>

                        </NavDropdown>


                    </Nav>
                </Container>
            </Navbar>


            
        </div>


    )
}

export default Navigation;