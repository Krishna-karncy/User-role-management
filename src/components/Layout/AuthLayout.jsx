import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {

    const { userData } = useSelector((state) => state.auth);

    if(userData) {
        return <Navigate to="/dashboard" replace />
    }

  return (
    <Outlet />
  )
}

export default AuthLayout