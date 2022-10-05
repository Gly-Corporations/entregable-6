import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PurchasesList from '../components/PurchasesList';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk());
      }, []);

    return (
        <div className='purchases-container'>
            {
                purchases.map(purchase => (
                    <PurchasesList key={purchase.id} purchase={purchase} listProducts={purchase.cart.products}/>
                ))
            }
        </div>
    );
};

export default Purchases;