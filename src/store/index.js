import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './slices/category.slice'
import loaderSlice from './slices/loader.slice'
import productsSlice from './slices/products.slice'

export default configureStore({
    reducer: {
        loader: loaderSlice,
        products: productsSlice,
        category: categorySlice,
    }
})
