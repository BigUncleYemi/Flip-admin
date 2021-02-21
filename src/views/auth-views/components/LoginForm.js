import React from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "redux/actions/Auths";

export const LoginForm = (props) => {

  const {
    loading
  } = props;

	const onLogin = ({ email, password }) => {
    props.submitLogin({
      email,
      password
    })
	}

  return (
    <>
      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter a validate email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div>
              <span>Password</span>
            </div>
          }
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading
})

const mapDispatchToProps  = dispatch => ({
  submitLogin:  data => {
    dispatch(loginUser(data));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
