import React, {useState,useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Tag } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useSelector ,useDispatch} from 'react-redux';
import { API_BASE_URL } from 'configs/AppConfig';
import { useNavigate } from "react-router-dom";
import FileSaver from "file-saver";
import utils from 'utils'
import { getList } from 'store/slices/userSlice';
import axios from 'axios';
const { Option } = Select

const UserList = () => {
	const navigate = useNavigate();
	const dispatch=useDispatch();
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const users = useSelector(state => state.user.users);
	const getUserStatus = status => {
		if(status === true) {
			return 'blue'
		}
		if(status === false) {
			return 'cyan'
		}
		return ''
	}
	const getUserStatusLabel = status => {
		if(status === true) {
			return 'Active'
		}
		if(status === false) {
			return 'Inactive'
		}
	}
	const [list, setList] = useState(users)
	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">Edit</span>
				</Flex>
			</Menu.Item>
			<Menu.Item >
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	useEffect(() =>{
		dispatch(getList());
		console.log("daa",list);
	},[dispatch])
	

	useEffect(() => {
        if (users) {
            setList(users);
        }
    }, [users]);


	const addTask = () => {
		navigate(`/app/usermanagement/add-user`)
	}
	
	const exportUser = async () => {
		try {
		  const response = await fetch(`${API_BASE_URL}/api/export-users`);
		  const blob = await response.blob(); // Get the blob object from the response
	
		  // Save the blob as a file using FileSaver.js
		  FileSaver.saveAs(blob, 'users.xlsx');
		} catch (error) {
		  console.error('Export failed:', error);
		  // Handle error, e.g., show error message to user
		}
}
	
	const viewDetails = row => {
		const rowData = encodeURIComponent(JSON.stringify(row));
		navigate(`/app/usermanagement/edit-user/${row.id}?data=${rowData}`);
	}
	
	const deleteRow = row => {

	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'First Name',
			dataIndex: 'firstname',
		},
        {
			title: 'Last Name',
			dataIndex: 'lastname',
		},
    {
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Status',
			dataIndex : 'is_active',
			render: (_, rec) => (
				<><Tag color={getUserStatus(rec.is_active)}>{getUserStatusLabel(rec.is_active)}</Tag></>
			),

		},

		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)}/>
				</div>
			)
		}
	];
	
	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : users
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="space-between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
					<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>					
					</div>
	
				</Flex>
				<div className='d-flex flex-row'>
					<Button onClick={exportUser} type="primary" icon={<PlusCircleOutlined />} block>Export Users</Button>
                    <Button onClick={addTask}  className="ml-4" type="primary" icon={<PlusCircleOutlined />} block>Register User</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='id' 
				/>
			</div>
		</Card>
	)
}

export default UserList
