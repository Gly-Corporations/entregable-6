import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import MyNavbar from './components/MyNavbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import Purchases from './pages/Purchases'
import { getCategoryThunk } from './store/slices/category.slice'
import { getProductsThunk } from './store/slices/products.slice';

function App() {
  const [count, setCount] = useState(0)
  const loader = useSelector(state => state.loader)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getProductsThunk())
    dispatch(getCategoryThunk())
  }, [])

  return (
    <HashRouter>
      {
        loader && <LoadingScreen />
      }
      <MyNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/purchases' element={<Purchases />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App
