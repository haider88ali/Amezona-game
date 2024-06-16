import React from 'react'
import TaskFrom from '../taskform/index'
import { useParams } from 'react-router-dom';

const EditTask = () => {
	const params = useParams();

	return (
		<TaskFrom mode="EDIT" param={params}/>
	)
}

export default EditTask
