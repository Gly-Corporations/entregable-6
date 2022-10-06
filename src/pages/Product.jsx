import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAddToCart, getUpdateToCart } from '../store/slices/cartList.slice';
import { setLoader } from '../store/slices/loader.slice';
import { setHandleShow } from '../store/slices/handleShow.slice'
import { setTitleModal } from '../store/slices/titleModal.slice'

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const cartProducts = useSelector(state => state.cart)
    const token = window.localStorage.getItem('token')

    const productCurrent = products.find(product => product.id === Number(id))
    const productsCategories = products.filter(product => product.category.id === productCurrent.category.id)
    const cartProductCurrent = cartProducts.find(product => product.id === Number(id))

    window.scrollTo(0, 0)

    const productSelected = idSelected => {
        navigate(`/product/${idSelected}`)
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    const addProductToCart = () => {
        if (token !== '') {
            const item = {
                "id": id
            }

            if (cartProductCurrent !== undefined) {
                item.newQuantity = quantity + Number(cartProductCurrent.productsInCart.quantity)
                console.log(item)
                dispatch(getUpdateToCart(item))
                dispatch(setTitleModal('Successful update'))
                dispatch(setHandleShow(true))
            } else {
                item.quantity = quantity
                dispatch(getAddToCart(item))
                dispatch(setTitleModal('The produc was added successfully'))
                dispatch(setHandleShow(true))
            }
        } else {
            navigate('/login')
        }
    }

    return (
        <div>
            <ul className='list-link'>
                <li onClick={() => navigate('/')} className='list-item-home'>Home</li>
                <li className='list-item-title'>{productCurrent?.title}</li>
            </ul>
            <section className='detail-current-product'>
                <article>
                    <Carousel variant='dark'>
                        <Carousel.Item interval={2000}>
                            <img className="d-block w-100" src={productCurrent?.productImgs[0]} alt="Photo one of the Product" onLoad={() => dispatch(setLoader(false))} />
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <img className="d-block w-100" src={productCurrent?.productImgs[1]} alt="Photo one of the Product" onLoad={() => dispatch(setLoader(false))} />
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <img className="d-block w-100" src={productCurrent?.productImgs[2]} alt="Photo one of the Product" onLoad={() => dispatch(setLoader(false))} />
                        </Carousel.Item>
                    </Carousel>
                    <h3>{productCurrent?.title}</h3>
                    <div className='price-quantity'>
                        <div>
                            <p>Price</p>
                            <b>$ {productCurrent?.price}</b>
                        </div>
                        <div className='quantity'>
                            <p>Quantity</p>
                            <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} className='material-symbols-outlined'>remove</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className='material-symbols-outlined'>add</button>
                        </div>
                        <button onClick={() => addProductToCart()} className='addToCart-currentProduct'>Add to cart <span className='material-symbols-outlined'>shopping_cart</span></button>
                    </div>
                    <p className='detail-product'>{productCurrent?.description}</p>
                </article>
            </section>
            <section className='container-products'>
                <h3>Suggestions</h3>
                {
                    productsCategories.map(product => (
                        <article className='product-card' key={product.id} onClick={() => productSelected(product.id)}>
                            <div className='img-product'>
                                <img src={product.productImgs?.[0]} alt="" onLoad={() => dispatch(setLoader(false))} />
                            </div>
                            <div className='description-product'>
                                <h4>{product.title}</h4>
                                <p>Price</p>
                                <span>$ {product.price}</span>
                            </div>
                            <button className='material-symbols-outlined add-to-cart'>shopping_cart</button>
                        </article>
                    ))
                }
            </section>
        </div>
    );
};

export default Product;