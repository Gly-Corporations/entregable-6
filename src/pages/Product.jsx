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



    return (
        <div>
            <h2>Product number: {id}</h2>
            <article>
                <button onClick={() => changeImg('prev')}>Prev</button>
                <img src={productCurrent?.productImgs[numberImg]} alt="Photo one of the Product" />
                <button onClick={() => changeImg('next')}>Next</button>
                {productCurrent?.title}
                {productCurrent?.description}
                $ {productCurrent?.price}
            </article>
            <section className='container-products'>
                {
                    productsCategories.map(product => (
                        <article className='product-card' key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
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