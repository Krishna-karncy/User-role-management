import { useState } from 'react';
import { Button, App, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addRole, getAllRoles, editRole } from '../../../service/RoleService';
import { getAllPermissions } from '../../../service/PermissionService';
import RoleForm from './RoleForm'
import EditRole from './EditRole'
import RoleTable from './RoleTable';

const ManageRoles = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const { data: roles, error } = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
  });


  const { data: permissions } = useQuery({
    queryKey: ['permissions'],
    queryFn: getAllPermissions,
  });

  const addPermissionMutation = useMutation({
    mutationFn: addRole,
    onSuccess: (data) => {
      message.success(data.message);
      setIsModalVisible(false);
    },
    onError: (error) => {
      message.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });


  const editRoleMutation = useMutation({
    mutationFn: editRole,
    onSuccess: (data) => {
      message.success(data.message);
      setIsEditModalVisible(false);
    },
    onError: (error) => {
      message.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });


  const onFinish = (values) => {
    addPermissionMutation.mutate(values);
  };

  const onEditFinish = (values) => {
    values.roleId = editData.roleId;
    values.privilegeId = [...values.privilegeName];
    values.userId = 'USR1000002'
    delete values.privilegeName
    editRoleMutation.mutate(values);
    console.log(values);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
  };

  console.log(error);

  return (
    <div className='products-container'>
      <div className='products-header'>
        <h3>Manage Roles <Badge count={roles?.length || 0} style={{ backgroundColor: '#57F92F' }} /></h3>
          <Button
            type="primary"
            onClick={showModal}
            icon={<PlusOutlined />}
          >
            Add New Role
          </Button>
      </div>
      <p style={{ color: 'red' }}>{error? error.response?.data?.response : ''}</p>
      <RoleTable
        roles={roles?.rolePermission || []}
        setEditData={setEditData}
        setIsEditModalVisible={setIsEditModalVisible}
      />
      <RoleForm
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        onFinish={onFinish}
        loading={addPermissionMutation.isPending}
        permissions={permissions?.permissions || []}
      />
      <EditRole
        isModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        onFinish={onEditFinish}
        loading={editRoleMutation.isPending}
        permissions={permissions?.permissions || []}
        editData={editData}
      />
    </div>
  );
};

export default ManageRoles;
