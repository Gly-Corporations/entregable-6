import axios from 'axios';
import { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSetCart, purchasesCartThunk } from '../store/slices/cartList.slice';
import { setHandleShow } from '../store/slices/handleShow.slice';
import { getProductsThunk } from '../store/slices/products.slice';
import { setTitleModal } from '../store/slices/titleModal.slice';
import getConfig from '../utils/getConfig';

const Cart = ({ show, handleClose }) => {
    const cartList = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user')) || {}

    const productSelected = id => {
        navigate(`/product/${id}`)
        handleClose()
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        dispatch(getSetCart(user.id))
    }, [])

    const total = () => {
        let valor = 0
        cartList.forEach(product => valor += product.price * product.quantity)
        return (valor).toFixed(2)
    }

    const deleteItem = id => {
        axios.delete(`https://api-ecommerce-production-ca22.up.railway.app/api/v1/user/cart/product/${id}`, getConfig())
            .then(() => {
                dispatch(getSetCart(user.id))
                dispatch(setTitleModal('Removed product'))
                dispatch(setHandleShow(true))
            })
            .catch(error => console.log(error))
            .finally(() => {
                dispatch(getSetCart(user.id))
                dispatch(getProductsThunk())
            })
    }

    const pucharse = () => {
        dispatch(purchasesCartThunk(user.id))
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
                                <div onClick={() => productSelected(itemCart.productId)}>
                                    <p className='p-brand'>{itemCart.item.category?.name}</p>
                                    <b className='b-title'>{itemCart.item?.title}</b>
                                    <b className='b-quantity'>{itemCart?.quantity}</b>
                                    <p className='p-total'>Total: <b>$ {itemCart?.price * itemCart?.quantity}</b></p>
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