import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { createUser,updateUser } from 'store/slices/userSlice';
import ProductListData from "assets/data/product-list.data.json"
import { useNavigate } from "react-router-dom"; // Import navigate instead of useNavigate


const ADD = 'ADD'
const EDIT = 'EDIT'

const UserForm = props => {
	
	const navigate = useNavigate();

    const dispatch = useDispatch();
	const { mode = ADD, param } = props
	const loading = useSelector(state => state.user.loading);

	const [form] = Form.useForm();
	const [submitLoading, setSubmitLoading] = useState(false)

	useEffect(() => {
    	if(mode === EDIT) {
			const { id } = param
			const urlParams = new URLSearchParams(window.location.search);
			const rowData = urlParams.get('data');
			// Parse the rowData into an object
			const row = JSON.parse(decodeURIComponent(rowData));
			form.setFieldsValue({
				firstname: row.firstname,
				lastname: row.lastname,
				email: row.email,
				isActive: row.is_active ? true : false 
			});
		}
  	}, [form, mode, param, props]);


	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			if(mode === ADD) {
				dispatch(createUser(values)).then(res=>{
					message.success(`New User Registered Successfully`);
				})

				}
				if(mode === EDIT) {
					const { id } = param;
					dispatch(updateUser({values,id})).then(res=>{
						message.success(`User Updated successfull`);
					})
				}
			
                // console.log(res);
                // setSubmitLoading(false)
				// if(mode === ADD) {
				// 	message.success(`New User Registered Successfully`);
				// }
				// if(mode === EDIT) {
				// 	message.success(`User Updated successfull`);
				// }
          
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
							<h2 className="mb-3">{mode === 'ADD'? 'Create User' : `Edit User`} </h2>
							<div className="mb-3">
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={loading} >
									{mode === 'ADD'? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs 
						defaultActiveKey="1" 
						style={{marginTop: 30}}
						items={[
							{
								label: 'General',
								key: '1',
								children: <GeneralField 
                                showForgetPassword="false"
								mode={mode}
								/>,
							},
					
						]}
					/>
				</div>
			</Form>
		</>
	)
}

export default UserForm
