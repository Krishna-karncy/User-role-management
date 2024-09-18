import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile/Profile';
import DashboardLayout from '../components/Layout/DashboardLayout';
import AuthLayout from '../components/Layout/AuthLayout';
import NotFound from '../components/Error/NotFound';
import ManageRole from '../pages/UserRoleManagement/ManageRole/ManageRole';
import ManagePermission from '../pages/UserRoleManagement/ManagePermission/ManagePermission';
import ManageUser from '../pages/UserRoleManagement/ManageUser/ManageUser';
import Business from '../pages/Business/Business';
import Investor from '../pages/Investor/Investor';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" />,
    },
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'business',
                element: <Business />
            },
            {
                path: 'investor',
                element: <Investor />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'manage-admin/manage-user',
                element: <ManageUser />
            },
            {
                path: 'manage-admin/manage-role',
                element: <ManageRole />
            },
            {
                path: 'manage-admin/manage-permission',
                element: <ManagePermission />
            },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;