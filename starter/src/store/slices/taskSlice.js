import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { navigate } from "react-router-dom"; // Import navigate instead of useNavigate

import API from 'services/ApiService';
const user= JSON.parse(localStorage.getItem('user'));

export const initialState = {
	loading: false,
	message: '',
    tasks:[],
	showMessage: false,
    redirect: null,
}

  export const createTask = createAsyncThunk(
	"task/create",
	async (data) => {
        const userId=user.id;
        const newData={...data,userId};
		const response = await API("/api/create-task", "post", newData);
		return response.data;
	
	}
  
  )
  export const getList = createAsyncThunk(
	"task/list",
	async () => {
		const response = await API(`/api/tasks/${user.id}`, "get", {});
		return response.data;
	
	}
	
  
  )
  export const updateTask = createAsyncThunk(
    "task/update",
    async (data) => {
		console.log("data",data)
        const userId=user.id;
        const newData={...data,userId};
        const response = await API(`/api/update-task`, "post", newData);
        return response.data;
    
    }
  )

  export const deleteTask = createAsyncThunk(
	"task/delete",
	async (taskId) => {
		const response = await API(`/api/delete-task/${taskId}`, "post", {});
		return response.data;
	
	}
	
  
  )
export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {},
    
	extraReducers: (builder) => {
		builder
			.addCase(createTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(createTask.fulfilled, (state, action) => {
				state.loading = false;			})
			.addCase(createTask.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
            .addCase(updateTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				state.loading = false;
				window.location.href="/app/taskmanagements/tasks";

			})

			.addCase(updateTask.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(deleteTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.loading = false;
				window.location.href="/app/taskmanagements/tasks";
			})
            .addCase(getList.pending, (state) => {
			})
			.addCase(getList.fulfilled, (state, action) => {
				state.tasks=action.payload;
			})
	},
})


export default taskSlice.reducer