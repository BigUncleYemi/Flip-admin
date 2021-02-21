import React from "react";
import { connect } from "react-redux";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { registerUser } from "redux/actions/Auths";

const rules = {
  email: [
    {
      required: true,
      message: "Please input your email address",
    },
    {
      type: "email",
      message: "Please enter a validate email!",
    },
  ],
  firstName: [
    {
      required: true,
      message: "Please input your First Name",
    },
  ],
  lastName: [
    {
      required: true,
      message: "Please input your Last Name",
    },
	],
	inviteCode: [
    {
      required: true,
      message: "Please input your Invite Code",
    },
	],
  password: [
    {
      required: true,
      message: "Please input your password",
    },
  ],
  confirm: [
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject("Passwords do not match!");
      },
    }),
  ],
};

export const RegisterForm = (props) => {
  const { loading, submitRegister } = props
  const [form] = Form.useForm();

  const onSignUp = () => {
    form
      .validateFields()
      .then((values) => {
				submitRegister(values)
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="register-form"
        onFinish={onSignUp}
      >
				<Form.Item name="firstName" label="First Name" rules={rules.firstName} hasFeedback>
					<Input />
				</Form.Item>
				<Form.Item name="lastName" label="Last Name" rules={rules.lastName} hasFeedback>
					<Input />
				</Form.Item>
        <Form.Item name="email" label="Email" rules={rules.email} hasFeedback>
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item name="inviteCode" label="Invite Code" rules={rules.inviteCode} hasFeedback>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={rules.password}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="ConfirmPassword"
          rules={rules.confirm}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
  submitRegister: (data) => {
    dispatch(registerUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
