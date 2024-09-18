import { useState } from "react";
import { Layout, Dropdown, Avatar, Flex, Drawer, Button, App } from "antd";
import { UserOutlined, LogoutOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../redux/slice/AuthSlice";
import Logo from '../../assets/images/logo.png';
import SidebarContent from "../Sidebar/SidebarContent";
import { logoutUser } from "../../service/AuthService";
import "./Navbar.scss";

const { Header } = Layout;

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const {message} = App.useApp();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        try {
            const res = await logoutUser();
            if (res) {
                message.success(res.message);
                dispatch(logout());
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const items = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: <Link to="/profile">Profile</Link>,
        },
        {
            key: '2',
            icon: <LogoutOutlined />,
            label: <span onClick={handleLogout}>Logout</span>,
        },
    ];

    return (
        <Header className="header">
            <div className="navbar-left">
                <Button
                    type="text"
                    icon={<MenuUnfoldOutlined />}
                    onClick={showDrawer}
                    className="menu-button"
                />
                <Drawer title={null} placement="left" onClose={onClose} open={open} width={230} className="custom-drawer">
                    <SidebarContent onClose={onClose}/>
                </Drawer>
                <img src={Logo} alt="logo" className="logo" />
            </div>
            <div className="navbar-right">
                <Dropdown menu={{ items }} trigger={['hover']} arrow placement="bottom">
                    <Flex align="center" justify="center" vertical={false} gap={5} style={{ cursor: 'pointer' }}>
                        <Avatar src="" style={{ backgroundColor: '#57F92F' }}>
                            {userData.userData?.userName?.charAt(0).toUpperCase()}
                        </Avatar>
                        <p className="user-name">{userData.userData?.userName}</p>
                    </Flex>
                </Dropdown>
            </div>
            
        </Header>
    );
};



export default Navbar;
