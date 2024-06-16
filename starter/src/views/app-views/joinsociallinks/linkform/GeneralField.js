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
	social_type: [
		{
			required: true,
			message: 'Please enter social media type',
		}
	],
	task_type: [
		{
			required: true,
			message: 'Please enter task type',
		}
	],
	rewards: [		
	],

}


const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={24}>
			<Card title="Enter Link">
				<Form.Item name="social_link" label="Social Media Link" rules={rules.social_link}>
					<Input placeholder="Social Media Link" />
				</Form.Item>
				<Form.Item name="social_type" label="Social Media Type" rules={rules.social_type}>
                <Input placeholder="Social Media type" />
				</Form.Item>
                <Form.Item name="task_type" label="Task type" rules={rules.task_type}>
                <Input placeholder="Task Type" />
				</Form.Item>
                <Form.Item name="rewards" label="Rewards" rules={rules.rewards}>
                <InputNumber
							className="w-100"
							formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/\$\s?|(,*)/g, '')}
						/>
					
				</Form.Item>
			</Card>
</Col>
	</Row>
)

export default GeneralField
