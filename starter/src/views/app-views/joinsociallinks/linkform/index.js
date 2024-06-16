import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import ProductListData from "assets/data/product-list.data.json"
import { useSelector, useDispatch } from 'react-redux';
import { createLink ,updateLink} from 'store/slices/linkSlice';
import { useNavigate } from "react-router-dom"; // Import navigate instead of useNavigate

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = props => {

	const { mode = ADD, param } = props
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const links = useSelector(state => state.link.links);
	const [form] = Form.useForm();
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	useEffect(() => {
		if (mode === EDIT) {
			console.log('is edit')
			console.log('props', props)
			const urlParams = new URLSearchParams(window.location.search);
			const rowData = urlParams.get('data');
			
			// Parse the rowData into an object
			const row = JSON.parse(decodeURIComponent(rowData));
			form.setFieldsValue({
				social_link: row.social_link,
				social_type: row.social_type,
				task_type: row.task_type,
				rewards: row.rewards,
				linkId: row.id
			});
		}
	}, [form, mode, param, props]);


	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setSubmitLoading(false)
			if (mode === ADD) {
				dispatch(createLink(values));
			}
			if (mode === EDIT) {
				console.log(values);
				const { id } = param
				const linkId = id;
				const data = {...values,linkId}
				dispatch(updateLink(data));
			}
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
				initialValues={{
					heightUnit: 'cm',
					widthUnit: 'cm',
					weightUnit: 'kg'
				}}
			>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="space-between" alignItems="center">
							<h2 className="mb-3">{mode === 'ADD' ? 'Add New Link' : `Edit Link`} </h2>
							<div className="mb-3">
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD' ? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs
						defaultActiveKey="1"
						style={{ marginTop: 30 }}
						items={[
							{
								label: 'General',
								key: '1',
								children: <GeneralField
								/>,
							},

						]}
					/>
				</div>
			</Form>
		</>
	)
}

export default ProductForm
