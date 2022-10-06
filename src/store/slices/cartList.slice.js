import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setLoader } from './loader.slice';

export const cartListSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const getSetCart = () => (dispatch) => {
    dispatch(setLoader(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setLoader(false)))
}

export const getAddToCart = ( item ) => (dispatch) => {
    dispatch(setLoader(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', item, getConfig())
        .then(() => dispatch(getSetCart()))
        .finally(() => dispatch(setLoader(false)));
}

export const getUpdateToCart = ( item ) => (dispatch) => {
    dispatch(setLoader(true));
    return axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart', item, getConfig())
        .then(() => dispatch(getSetCart()))
        .finally(() => dispatch(setLoader(false)));
}

export const purchasesCartThunk = () => (dispatch) => {
    dispatch(setLoader(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setLoader(false)));
}

export const { setCart } = cartListSlice.actions;

export default cartListSlice.reducer;
