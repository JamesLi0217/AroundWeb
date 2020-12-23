import React from 'react';
import { Form, Button, Input, message } from 'antd';
import {BASE_URL} from '../constants'
import axios from 'axios';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Register(props) {

    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);

        const { username, password } = values;
        
        const opt = {
            method: "POST",
            url: `${BASE_URL}/signup`,
            data: {
                username: username,
                password: password
            },
            headers: {"Content-Type": "Application/json"}
        }

        axios(opt)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    message.success("Register Succeed!");
                    props.history.push('/login');
                }
            })
            .catch(e => {
                console.log('Register failed, ', e.message);
                message.error("Register failed");
            })
    };

    return (
        <Form
            className="register"
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Register;