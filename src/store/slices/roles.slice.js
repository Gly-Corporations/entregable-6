import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoader } from './loader.slice';

export const roleSlice = createSlice({
    name: 'roles',
    initialState: [],
    reducers: {
        setRole: (state, action) => {
            return action.payload;
        },
    }
})

export const getRolesThunk = () => (dispatch) => {
    dispatch(setLoader(true));
    return axios.get('https://api-ecommerce-production-ca22.up.railway.app/api/v1/roles')
        .then(res => dispatch(setRole(res.data)))
        .finally(() => dispatch(setLoader(false)));
}

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;
