import { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';


const PermissionForm = ({
  isModalVisible,
  handleCancel,
  onFinish,
  loading
}) => {
    
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [isModalVisible]);

  return (
    <Modal
      title="Add New Permission"
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
          label="Permission Name"
          name="permission_name"
          rules={[{ required: true, message: 'Please input the permission name!' }]}
        >
          <Input />
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

export default PermissionForm;
