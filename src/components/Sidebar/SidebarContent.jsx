import { useEffect, useState } from 'react';
import { Menu, Image } from 'antd';
import { PieChartOutlined, SettingOutlined, SafetyOutlined, KeyOutlined } from '@ant-design/icons';
import { FiUser  } from "react-icons/fi";
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import './Sidebar.scss';
import { useSelector } from 'react-redux';


const allMenuItems = [
  {
    key: '/dashboard',
    icon: <PieChartOutlined />,
    label: 'Dashboard',
    // permission: 'view_dashboard',
  },
  {
    key: '/business',
    icon: <PieChartOutlined />,
    label: 'Business',
    permission: 'read_bu',
  },
  {
    key: '/investor',
    icon: <PieChartOutlined />,
    label: 'Investor',
    permission: 'read_investor',
  },
  {
    key: '/profile',
    icon: <FiUser  />,
    label: 'Profile',
    // permission: 'view_profile',
  },
  {
    key: 'manage-admin',
    icon: <SettingOutlined />,
    label: 'Manage Admin',
    permission: 'user_role_management_access',
    children: [
      {
        key: '/manage-admin/manage-user',
        label: 'Manage user',
        icon: <FiUser  />,
        permission: 'user_role_management_show',
      },
      {
        key: '/manage-admin/manage-role',
        label: 'Manage Role',
        icon: <SafetyOutlined />,
        permission: 'user_role_management_show',
      },
      {
        key: '/manage-admin/manage-permission',
        label: 'Manage Permission',
        icon: <KeyOutlined />,
        permission: 'user_role_management_show',
      },
    ],
  },
];

const SidebarContent = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);


  const filterMenuItemsByPermission = (items) => {

    return items
      .filter(item => !item.permission || userData?.userData?.privilegeName.includes(item.permission))
      // .map(item => ({
      //   ...item,
      //   children: item.children ? filterMenuItemsByPermission(item.children) : undefined,
      // }))
      // .filter(item => !item.children || item.children.length > 0);
  };

  const filteredItems = filterMenuItemsByPermission(allMenuItems);

  const onClick = (e) => {
    navigate(e.key);
    onClose();
  };

  return (
    <>
      <div className="logo-container">
        <Image src={Logo} className='logo' preview={false} />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={filteredItems} 
        className='custom-menu'
        onClick={onClick}
      />
    </>
  );
};

export default SidebarContent;
