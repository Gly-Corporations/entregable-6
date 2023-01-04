import axios from 'axios';
import React, { useEffect } from 'react';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSetCart, purchasesCartThunk } from '../store/slices/cartList.slice';
import { setHandleShow } from '../store/slices/handleShow.slice';
import { setTitleModal } from '../store/slices/titleModal.slice';
import getConfig from '../utils/getConfig';

const Cart = ({ show, handleClose }) => {
    const cartList = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productSelected = id => {
        navigate(`/product/${id}`)
        handleClose()
    }

    useEffect(() => {
        dispatch(getSetCart())
    }, [])

    const total = () => {
        let valor = 0
        cartList.forEach(product => valor += product.price * product.productsInCart.quantity)
        return valor
    }

    const deleteItem = id => {
        axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
            .then(() => {
                dispatch(getSetCart())
                dispatch(setTitleModal('Removed product'))
                dispatch(setHandleShow(true))
            })
            .catch(error => console.log(error))
    }

    const pucharse = () => {
        dispatch(purchasesCartThunk())
        dispatch(setTitleModal('Successfull purchase'))
        dispatch(setHandleShow(true))
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Shoppign Cart</b></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul className='cart-container'>
                    {
                        cartList.map(itemCart => (
                            <li key={itemCart.id}>
                                <div onClick={() => productSelected(itemCart.id)}>
                                    <p className='p-brand'>{itemCart?.brand}</p>
                                    <b className='b-title'>{itemCart?.title}</b>
                                    <b className='b-quantity'>{itemCart.productsInCart?.quantity}</b>
                                    <p className='p-total'>Total: <b>$ {itemCart?.price * itemCart.productsInCart?.quantity}</b></p>
                                </div>
                                <button className='material-symbols-outlined btn-delete-item' onClick={() => deleteItem(itemCart.id)}>delete</button>
                            </li>
                        ))
                    }
                </ul>
                <section className='section-total'>
                    <article className='container-total'>
                        <span>Total:</span>
                        <b>$ {total()}</b>
                    </article>
                    <button className='btn-buy' onClick={pucharse}>Checkout</button>
                </section>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;