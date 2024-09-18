import { Table, Button, Flex } from 'antd';

const ProductTable = ({
  permissions,
}) => {

  const columns = [
    {
      title: 'Permission ID',
      dataIndex: 'privilegeId',
      key: 'privilegeId',
      fixed: 'left',
      width: 300,
    },
    {
      title: 'Permission Name',
      dataIndex: 'privilegeName',
      key: 'privilegeName',
      width: 300,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
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
      dataSource={permissions}
      columns={columns}
      rowKey="_id"
      bordered
      size="middle"
    />
  );
};

export default ProductTable;
