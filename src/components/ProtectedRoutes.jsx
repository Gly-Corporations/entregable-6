import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const dispatch = useDispatch()
    const token = window.localStorage.getItem('token')
    const { isVerify } = JSON.parse(window.localStorage.getItem('user'))

	if(token && isVerify) return <Outlet />;

    return <Navigate to='/login' />;
}

export default ProtectedRoutes;