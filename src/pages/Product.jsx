import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setLoader } from '../store/slices/loader.slice';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const productCurrent = products.find(product => product.id === Number(id))
    const productsCategories = products.filter(product => product.category.id === productCurrent.category.id)

    const productSelected = idSelected => {
        navigate(`/product/${idSelected}`)
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.scrollTo(0, 0)


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
                            <button className='material-symbols-outlined'>remove</button>
                            <span>5</span>
                            <button className='material-symbols-outlined'>add</button>
                        </div>
                        <button className='addToCart-currentProduct'>Add to cart <span className='material-symbols-outlined'>shopping_cart</span></button>
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