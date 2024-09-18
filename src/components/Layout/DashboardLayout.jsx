import { Layout } from 'antd';
import React, { useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet,useLocation } from 'react-router-dom';
import "./DashboardLayout.scss";
import useAxiosInterceptors from '../../service/useAxiosInterseptor';
import { getUser } from '../../service/UserService';
import { setCredentials } from '../../redux/slice/AuthSlice';

const { Content } = Layout;

const DashboardLayout = () => {
    const { userData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    useAxiosInterceptors();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            if (user) {
                dispatch(setCredentials(user));
            }
        };
        fetchUser();
    }, [dispatch, location]);

    if (!userData) {
        return <Navigate to="/login" replace />
    }

    

    return (
        <Layout className='layout'>
            <Sidebar />
            <Layout>
                <Navbar />
                <Content className='content'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
