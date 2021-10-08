import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 5,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
};

export default class Login extends Component {
  render() {
    return (
      <>
        <Form
          {...layout}
          style={{ marginTop: 100 }}
          onFinish={this.props.handleLogin}
        >
          <Form.Item
            label="Username"
            name="usernameOrEmail"
            rules={[
              {
                required: true,
                max: 15,
                min: 5,
                message: "Invalid username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Insert your username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                max: 100,
                min: 8,
                message: "Invalid password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Insert your password"
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button style={{ marginLeft: 25 }} htmlType="submit">
              <a href="/register">Register</a>
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
