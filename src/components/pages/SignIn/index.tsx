import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import { SIGNIN_ENDPOINT } from '../../../constants/endpoints';
import { openErrorNotification } from '../../../utils';
import './styles.scss';

export const SignIn = () => {
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    axios.post(SIGNIN_ENDPOINT, {
      email: values.email,
      password: values.password,
    })
      .then(response => {
        console.log('Response: ', response)
        if (response.status === 201) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.accessToken);
          history.push('/dashboard');
        }
      })
      .catch(err => openErrorNotification(err.response.data.error, err.response.data.message));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container">
      <div className="sign-in-page">
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
          <Link to="/signUp">Go to Sign up</Link>
        </Form>
      </div>
    </div>
  );
};
