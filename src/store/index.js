import { configureStore } from '@reduxjs/toolkit'
import cartListSlice from './slices/cartList.slice'
import categorySlice from './slices/category.slice'
import loaderSlice from './slices/loader.slice'
import productsSlice from './slices/products.slice'
import purchasesSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
        loader: loaderSlice,
        products: productsSlice,
        category: categorySlice,
        purchases: purchasesSlice,
        cart: cartListSlice,
    }
})
