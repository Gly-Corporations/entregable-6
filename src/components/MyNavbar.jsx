import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSetCart } from '../store/slices/cartList.slice';
import Cart from './Cart';

const MyNavbar = () => {
    const token = window.localStorage.getItem('token')
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const logout = () => {
        window.localStorage.setItem('token', '')
        window.location.reload()
    }

    useEffect(() => {
        dispatch(getSetCart())
    }, [])

    return (
        <header className='nav-bar'>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand to='/' as={Link}>Ecommerce</Navbar.Brand>
                    <Nav>
                        <Nav.Link to='/login' as={Link}><span className={`material-symbols-outlined ${token !== '' && 'login-user'}`}>person</span></Nav.Link>
                        <Nav.Link to='/purchases' as={Link}><span className="material-symbols-outlined">inventory_2</span></Nav.Link>
                        <Nav.Link onClick={handleShow} ><span className="material-symbols-outlined">shopping_cart</span></Nav.Link>
                        {
                            token !== '' && <Nav.Link onClick={logout}><span className="material-symbols-outlined">logout</span></Nav.Link>
                        }
                    </Nav>
                </Container>
            </Navbar>
            <Cart show={show} handleClose={handleClose} />
        </header>
    );
};

export default MyNavbar;