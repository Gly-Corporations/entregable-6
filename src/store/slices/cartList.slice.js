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

export const { setCart } = cartListSlice.actions;

export default cartListSlice.reducer;
