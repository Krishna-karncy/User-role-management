import { Table, Button, Flex, Tag } from 'antd';

const RoleTable = ({
  roles,
  setEditData,
  setIsEditModalVisible
}) => {

  

  const handleEdit = (role) => {
    setEditData(role);
    setIsEditModalVisible(true);
  }

  const columns = [
    {
      title: 'Role ID',
      dataIndex: 'roleId',
      key: 'roleId',
      fixed: 'left',
      width: 250,
    },
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 130,
    },
    {
      title: 'Permissions',
      dataIndex: 'privilegeName',
      key: 'privilegeName',
    //   width: 400,
      render: (_, record) => 
        record.privilegeName.map((permission) => <Tag color='green'>{permission}</Tag>),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 250,
      render: (_, record) => (
        <Flex gap="10px">
          <Button type='primary'>View</Button>
          <Button color='green' onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger>Delete</Button>
        </Flex>
      ),
    },
  ];

  return (
    <Table
      dataSource={roles}
      columns={columns}
      rowKey="_id"
      bordered
      size="middle"
      scroll={{ x: true }}
    />
  );
};

export default RoleTable;
