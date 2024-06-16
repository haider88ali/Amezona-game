import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { LoadingOutlined } from '@ant-design/icons';
const user= JSON.parse(localStorage.getItem('user'));
const { Dragger } = Upload;
const { Option } = Select;

const rules = {
	social_link: [
		{
			required: true,
			message: 'Please enter social media link',
		}
	],

}


const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={24}>
			<Card title="Enter Task">
				<Form.Item name="social_link" label="Social Media Link" rules={rules.social_link}>
					<Input placeholder="Social Media Link" />
				</Form.Item>
			</Card>
</Col>
	</Row>
)

export default GeneralField
