import React, {useState,useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useNavigate } from "react-router-dom";
import utils from 'utils'
import { getList ,deleteTask} from 'store/slices/taskSlice';
import { useSelector ,useDispatch} from 'react-redux';

const { Option } = Select



const TaskList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const tasks = useSelector(state => state.task.tasks);
	const [list, setList] = useState(tasks)
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
        if (tasks) {
            setList(tasks);
        }
    }, [tasks]);

	const addTask = () => {
		navigate(`/app/taskmanagements/add-task`)
	}
	
	const viewDetails = row => {
		const rowData = encodeURIComponent(JSON.stringify(row));
		navigate(`/app/taskmanagements/edit-task/${row.id}?data=${rowData}`);

	}
	
	const deleteRow = row => {
		dispatch(deleteTask(row.id)).then(res => {
			navigate("/app/taskmanagements/tasks");

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
		const searchArray = e.currentTarget.value? list : tasks
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	const handleShowCategory = value => {
		if(value !== 'All') {
			const key = 'social_type'
			const data = utils.filterArray(tasks, key, value)
			setList(data)
		} else {
			setList(tasks)
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
					<Button onClick={addTask} type="primary" icon={<PlusCircleOutlined />} block>Add Task</Button>
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

export default TaskList
