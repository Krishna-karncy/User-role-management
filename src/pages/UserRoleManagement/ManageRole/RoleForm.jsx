import { useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';


const RoleForm = ({
  isModalVisible,
  handleCancel,
  onFinish,
  loading,
  permissions
}) => {
    
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [isModalVisible]);

  return (
    <Modal
      title="Add New Role"
      open={isModalVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        className='add-product-form'
      >
        <Form.Item
          label="Role Name"
          name="role_name"
          rules={[{ required: true, message: 'Please input the role name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Permissions"
          name="permissions"
          rules={[{ required: true, message: 'Please input the permissions!' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select permissions"
            options={permissions.map((permission) => ({
              label: permission.privilegeName,
              value: permission.privilegeId
            }))}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Add Permission
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoleForm;
