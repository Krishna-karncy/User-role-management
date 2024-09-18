import { useEffect } from 'react';
import { Modal, Form, Input, Button, Select, App, Space } from 'antd';
import { CopyOutlined, KeyOutlined } from '@ant-design/icons';

const UserForm = ({
  isModalVisible,
  handleCancel,
  onFinish,
  loading,
  roles,
}) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  
  useEffect(() => {
    form.resetFields();
  }, [isModalVisible]);

  const onFormFinish = (values) => {
    const selectedRole = roles.find(role => role.role_name === values.role);
    if (selectedRole) {
      onFinish(values, selectedRole);
    }
  };

 
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const passwordLength = 12;
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    form.setFieldsValue({ password });
    message.success('Password generated!');
  };

  
  const copyToClipboard = () => {
    const password = form.getFieldValue('password');
    if (password) {
      navigator.clipboard.writeText(password);
      message.success('Password copied to clipboard!');
    } else {
      message.warning('No password to copy!');
    }
  };

  return (
    <Modal
      title="Add New User"
      open={isModalVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFormFinish}
        form={form}
        className="add-product-form"
      >
        <Form.Item
          label="User Name"
          name="name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="User Email"
          name="email"
          rules={[{ required: true, message: 'Please input the email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input or generate the password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button icon={<KeyOutlined />} onClick={generatePassword} type="default">
              Generate Password
            </Button>
            <Button icon={<CopyOutlined />} onClick={copyToClipboard} type="default">
              Copy to Clipboard
            </Button>
          </Space>
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select the role!' }]}
        >
          <Select
            placeholder="Select role"
            options={roles.map((role) => ({
              label: role.role_name,
              value: role.role_name,
            }))}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Add Admin User
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
