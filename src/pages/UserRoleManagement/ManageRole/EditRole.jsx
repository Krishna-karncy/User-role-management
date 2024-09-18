import { useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';


const EditRole = ({
    isModalVisible,
    handleCancel,
    onFinish,
    loading,
    permissions,
    editData
}) => {

    const [form] = Form.useForm();

    useEffect(() => {
        const privilegeIds = editData?.privilegeName?.map(privilegeName => {
            const permission = permissions.find(permission => permission.privilegeName === privilegeName);
            return permission ? permission.privilegeId : null;
        }).filter(id => id !== null);

        form.setFieldsValue({
            roleName: editData?.roleName,
            privilegeName: privilegeIds
        });

    }, [editData, permissions]);

    return (
        <Modal
            title="Edit Role"
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
                    name="roleName"
                    rules={[{ required: true, message: 'Please input the role name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Permissions"
                    name="privilegeName"
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
                        Edit Role
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditRole;
