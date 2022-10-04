import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const tokenIsTrue = () => {
        const token = window.localStorage.getItem('token')
        return token !== ''
    }

	if(tokenIsTrue()){
        return <Outlet />
    } else { 
        return <Navigate to='/login' />
    }
}

export default ProtectedRoutes;