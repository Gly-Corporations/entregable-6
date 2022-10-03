import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const products = useSelector(state => state.products)
    const [numberImg, setNumberImg] = useState(0)

    const productCurrent = products.find(product => product.id === Number(id))
    const productsCategories = products.filter(product => product.category.id === productCurrent.category.id)

    const changeImg = change => {
        if (change === 'prev') {
            if (numberImg === 0) {
                setNumberImg(2)
            } else {
                setNumberImg(numberImg - 1)
            }
        } else {
            if (numberImg === (productCurrent.productImgs.length - 1)) {
                setNumberImg(0)
            } else {
                setNumberImg(numberImg + 1)
            }
        }
    }

    const productSelected = idSelected => {
        navigate(`/product/${idSelected}`)
        window.scroll({
            top: 0,
            behavior: 'smooth'
          });
    }


    return (
        <div>
            <ul className='list-link'>
                <li onClick={() => navigate('/')} className='list-item-home'>Home</li>
                <li className='list-item-title'>{productCurrent?.title}</li>
            </ul>
            <section className='detail-current-product'>
                <article>
                    <div className='carousel'>
                        <button className='material-symbols-outlined' onClick={() => changeImg('prev')}>chevron_left</button>
                        <img src={productCurrent?.productImgs[numberImg]} alt="Photo one of the Product" />
                        <button className='material-symbols-outlined' onClick={() => changeImg('next')}>chevron_right</button>
                    </div>
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
                                <img src={product.productImgs?.[0]} alt="" />
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