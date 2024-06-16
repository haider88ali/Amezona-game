import React, { useState } from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { LoadingOutlined,LockOutlined } from '@ant-design/icons';

const rules = {
	f_name: [
		{
			required: true,
			message: 'Please enter first name',
		}
	],
	l_name: [
	],
	email: [
		{
			required: true,
			message: 'Please enter email',
		}
	],
	password: [	
        {
			required: true,
			message: 'Please enter password',
		}	
	],
    confirm: [
		{ 
			required: true,
			message: 'Please confirm your password!'
		},
		({ getFieldValue }) => ({
			validator(_, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject('Passwords do not match!');
			},
		})
	],
	isActive : [
	]

}

const GeneralField = props => {
    return (
		<>
	<Row gutter={16}>
		<Col xs={24} sm={24} md={24}>
			<Card title="Create User">

				<Form.Item name="firstname" label="First Name" rules={rules.f_name}>
					<Input placeholder="First Name" />
				</Form.Item>
				<Form.Item name="lastname" label="Last Name" rules={rules.l_name}>
                <Input placeholder="Last Name" />
				</Form.Item>
                <Form.Item name="email" label="Email" rules={rules.email}>
                <Input placeholder="Email" />
				</Form.Item>
				{props.mode !== 'EDIT' && (
                <Form.Item 
					name="password" 
					label="Password"
					rules={rules.password}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				)}
				{props.mode !== 'EDIT' && (
                <Form.Item 
					name="c_password" 
					label="Confirm Passsword"
					rules={rules.confirm}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				)}
				   <Form.Item 
        name="isActive" 
        label="Is Active"
        rules={rules.isActive}
      >
        <Select placeholder="Select Active Status">
          <Select.Option value={true}>Active</Select.Option>
          <Select.Option value={false}>Inactive</Select.Option>
        </Select>
      </Form.Item>
			</Card>
</Col>
	</Row>
    </>
)
}

export default GeneralField
