import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Image, App } from 'antd';
import Login_image from '../../assets/images/login_right_image.png';
import logo from '../../assets/images/logo.png';
import './Login.scss';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../service/AuthService';
import { useDispatch } from 'react-redux';
import { setCredentials } from "../../redux/slice/AuthSlice";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const { message } = App.useApp();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log(data);
            dispatch(setCredentials(data));
            navigate('/dashboard');
            message.success(data.message);
        },
        onError: (error) => {
                message.error(error.response?.data.message);
        }
    })
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        mutation.mutate(values);
    };


    return (
        <div className="login-container">
            <div className="login-form-container">
                <Image src={logo} preview={false} className='logo'/>
                <Form
                    name="login-form"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <Image src={Login_image} preview={false} className='login-image'/>
        </div>
    );
};

export default Login;
