import { useState } from 'react';
import { Button, App, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addPermission, getAllPermissions } from '../../../service/PermissionService';
import PermissionForm from './PermissionForm';
import PermissionTable from './PermissionTable';
import { useSelector } from 'react-redux';

const ManagePermissions = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  // const hasPermission = (permission) => {
  //   return user?.permissions.includes(permission);
  // };

  const { data: permissions, error } = useQuery({
    queryKey: ['permissions'],
    queryFn: getAllPermissions,
  });

  const addPermissionMutation = useMutation({
    mutationFn: addPermission,
    onSuccess: (data) => {
      message.success(data.message);
      setIsModalVisible(false);
    },
    onError: (error) => {
      message.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
  });


  const onFinish = (values) => {
    addPermissionMutation.mutate(values);
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
        <h3>Manage Permissions <Badge count={permissions?.length || 0} style={{ backgroundColor: '#57F92F' }} /></h3>
        {/* {hasPermission('Create permission') && ( */}
          <Button
            type="primary"
            onClick={showModal}
            icon={<PlusOutlined />}
          >
            Add New Permission
          </Button>
        {/* )} */}
      </div>
      <p style={{ color: 'red' }}>{error? error.response?.data?.response : ''}</p>
      <PermissionTable
        permissions={permissions?.permissions || []}
      />
      <PermissionForm
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        onFinish={onFinish}
        loading={addPermissionMutation.isPending}
      />
    </div>
  );
};

export default ManagePermissions;
