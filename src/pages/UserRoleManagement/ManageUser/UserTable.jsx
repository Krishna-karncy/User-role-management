import { Table, Button, Flex } from 'antd';

const RoleTable = ({
  users,
}) => {

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      fixed: 'left',
      width: 250,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Role',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 200,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 250,
      render: () => (
        <Flex gap="10px">
          <Button type='primary'>View</Button>
          <Button color='green'>Edit</Button>
          <Button danger>Delete</Button>
        </Flex>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="_id"
      bordered
      size="middle"
      scroll={{ x: true }}
    />
  );
};

export default RoleTable;
