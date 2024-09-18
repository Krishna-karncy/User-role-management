import { useState } from 'react';
import { Button, App, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addUser, getAllUsers } from '../../../service/UserService';
import UserForm from './UserForm';
import UserTable from './UserTable';
import { getAllRoles } from '../../../service/RoleService';

const ManageUser = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const { data: users, error } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });


  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
  });

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      message.success(data.message);
      setIsModalVisible(false);
    },
    onError: (error) => {
      message.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });


  const onFinish = (values, selectedRole) => {
    const payload = {
      ...values,
      permissions: selectedRole.permissions,
    };
    addUserMutation.mutate(payload);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log(error);

  return (
    <div className='products-container'>
      <div className='products-header'>
        <h3>Manage Users <Badge count={users?.length || 0} style={{ backgroundColor: '#57F92F' }} /></h3>
        <Button
          type="primary"
          onClick={showModal}
          icon={<PlusOutlined />}
        >
          Add New Role
        </Button>
      </div>
      <p style={{ color: 'red' }}>{error? error.response?.data?.response : ''}</p>
      <UserTable
        users={users?.users || []}
      />
      <UserForm
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        onFinish={onFinish}
        loading={addUserMutation.isPending}
        roles={roles?.rolePermission || []}
      />
    </div>
  );
};

export default ManageUser;
