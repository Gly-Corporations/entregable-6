import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit';
import { setLoader } from './loader.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            const products = action.payload
            return products
        }

    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setLoader(true));
    axios.get('https://e-commerce-api.academlo.tech/api/v1/products')
        .then(res => dispatch(setProducts(res.data.data.products)))
        //.finally(() => dispatch(setLoader(false)))
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
