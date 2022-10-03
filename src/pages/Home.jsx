import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const allProducts = useSelector(state => state.products)
    const categories = useSelector(state => state.category)
    const navigate = useNavigate()
    const [productsList, setProductsList] = useState([])
    const [value, setValue] = useState('')
    const [showFilters, setShowFilters] = useState('')
    const [showFilterPrice, setShowFilterPrice] = useState('show-filters')
    const [showFilterCategory, setShowFilterCategory] = useState('show-filters')
    const { register, handleSubmit, reset } = useForm()


    useEffect(() => {
        setProductsList(allProducts)
    }, [allProducts])
    
    const searchProduct = productCurrent => {
        const filtered = allProducts.filter(product => product.title.toLowerCase().includes(productCurrent.toLowerCase()))
        setProductsList(filtered)
    }

    const filteCategory = id => {
        const filtered = allProducts.filter(product => product.category.id === id)
        setProductsList(filtered)
        show()
    }

    const filterForPrice = valores => {
        const filtered = allProducts.filter(product => Number(product.price) >= Number(valores.from) && Number(product.price) <= Number(valores.to))
        setProductsList(filtered)

        reset(
            {
                from: '',
                to: ''
            }
        )
        show()
    }

    const show = () => {
        if (showFilters === '') {
            setShowFilters('show')
        } else {
            setShowFilters('')
        }
    }

    const showFiltersPrice = data => {
        if(data === 'price'){
            if(showFilterPrice === ''){
                setShowFilterPrice('show-filters')
            } else {
                setShowFilterPrice('')
            }
        } else {
            if(showFilterCategory === ''){
                setShowFilterCategory('show-filters')
            } else {
                setShowFilterCategory('')
            }
        }
    }
    
    console.log('Hello')

    return (
        <div>
            <aside className='aside-search'>
                <form className='form-search'>
                    <input className='input-search-name' value={value} onChange={e => setValue(e.target.value)} type="text" placeholder='Search Product' />
                    <button className='material-symbols-outlined btn-search-name' onClick={() => searchProduct(value)}>search</button>
                </form>
                <button onClick={() => show()} className='btn-showFilters'><span className='material-symbols-outlined btn-showFilters-icon'>filter_alt</span>Filters</button>
                <section className={`filters-more ${showFilters}`}>
                    <button onClick={() => show()} className='material-symbols-outlined btn-close-filters'>close</button>
                    <article>
                        <button className='btn-filters btn-filters-price' onClick={() => showFiltersPrice('price')}>Price<span className='material-symbols-outlined'>expand_more</span></button>
                        <form className={`form-search-price ${showFilterPrice}`} onSubmit={handleSubmit(filterForPrice)}>
                            <input className='input-filter-price' type="text" placeholder='From' {...register('from')}/>
                            <input className='input-filter-price' type="text" placeholder='To' {...register('to')}/>
                            <button className='btn-filter-price'>Filter Price</button>
                        </form>
                    </article>
                    <article>
                        <button className='btn-filters' onClick={() => showFiltersPrice('category')}>Categories<span className='material-symbols-outlined'>expand_more</span></button>
                        <ul className={`search-category ${showFilterCategory} `}>
                            {
                                categories.map(category => (
                                    <li onClick={() => filteCategory(category.id)} key={category.id}>{category.name}</li>
                                ))
                            }
                        </ul>
                    </article>
                </section>
            </aside>
            <section className='container-products'>
                {
                    productsList.map(product => (
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

export default Home;
