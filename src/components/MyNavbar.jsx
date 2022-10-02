import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
    return (
        <header className='nav-bar'>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand to='/' as={Link}>Ecommerce</Navbar.Brand>
                    <Nav>
                        <Nav.Link to='/login' as={Link}><span className="material-symbols-outlined">person</span></Nav.Link>
                        <Nav.Link to='/purchases' as={Link}><span className="material-symbols-outlined">inventory_2</span></Nav.Link>
                        <Nav.Link ><span className="material-symbols-outlined">shopping_cart</span></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
};

export default MyNavbar;