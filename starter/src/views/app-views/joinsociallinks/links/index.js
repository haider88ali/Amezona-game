import React, {useState,useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useNavigate } from "react-router-dom";
import utils from 'utils'
import { getList ,deleteLink} from 'store/slices/linkSlice';
import { useSelector ,useDispatch} from 'react-redux';

const { Option } = Select



const LinkList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const links = useSelector(state => state.link.links);
	const [list, setList] = useState(links)
	const categories =  [...new Set(list.map(obj => obj.social_type))]

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">Edit</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	useEffect(() =>{
		dispatch(getList());
	},[dispatch])
	

	useEffect(() => {
        if (links) {
            setList(links);
        }
    }, [links]);

	const addLink = () => {
		navigate(`/app/joinsociallinks/add-link`)
	}
	
	const viewDetails = row => {
		const rowData = encodeURIComponent(JSON.stringify(row));
		navigate(`/app/joinsociallinks/edit-link/${row.id}?data=${rowData}`);

	}
	
	const deleteRow = row => {
		dispatch(deleteLink(row.id)).then(res => {
			navigate("/app/joinsociallinks/links");

		});

	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Social Media Link',
			dataIndex: 'social_link',
		},
    {
			title: 'Social Media Type',
			dataIndex: 'social_type',
		},
		{
			title: 'Task Type',
			dataIndex: 'social_type',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'social_type')
		},
		{
			title: 'Rewards($)',
			dataIndex: 'rewards',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'rewards')
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
		const searchArray = e.currentTarget.value? list : links
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	const handleShowCategory = value => {
		if(value !== 'All') {
			const key = 'social_type'
			const data = utils.filterArray(links, key, value)
			setList(data)
		} else {
			setList(links)
		}
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="space-between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowCategory} 
							placeholder="Category"
						>
							<Option value="All">All</Option>
							{
								categories.map(elm => (
									<Option key={elm} value={elm}>{elm}</Option>
								))
							}
						</Select>
					</div>
				</Flex>
				<div>
					<Button onClick={addLink} type="primary" icon={<PlusCircleOutlined />} block>Add Link</Button>
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

export default LinkList
