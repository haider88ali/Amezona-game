import React from 'react'
import EditFrom from '../linkform/index'
import { useParams } from 'react-router-dom';

const EditLink = () => {
	const params = useParams();

	return (
		<EditFrom mode="EDIT" param={params}/>
	)
}

export default EditLink
