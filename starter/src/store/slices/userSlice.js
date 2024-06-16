import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_TOKEN } from 'constants/AuthConstant';
import FirebaseService from 'services/FirebaseService';
import AuthService from 'services/AuthService';
import API from 'services/ApiService';
export const initialState = {
	loading: false,
	message: '',
    users:[],
	showMessage: false,
	redirect: '',
}

  export const createUser = createAsyncThunk(
	"user/create",
	async (data) => {
		const response = await API("/api/register", "post", data);
		return response.data;
	
	}
  
  )
  export const updateUser = createAsyncThunk(
	"user/update",
	async (data) => {
		const response = await API(`/api/user/${data.id}`, "post", data.values);
		return response.data;
	
	}
  
  )
  export const getList = createAsyncThunk(
	"user/list",
	async () => {
		const response = await API("/api/users", "get", {});
		return response.data;
	
	}
  
  )
  export const exportList = createAsyncThunk(
	"user/export",
	async () => {
		const response = await API("/api/export-users", "get", {});
		return response.data;
	
	}
  
  )

  export const deletUser = createAsyncThunk(
	"user/delete",
	async (id) => {
		const response = await API(`/api/user/${id}`, "post", {});
		return response.data;
	
	}
  
  )


export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.loading = false
				window.location = "/app/usermanagement/users"
			})
			.addCase(createUser.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false
				window.location = "/app/usermanagement/users"
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
            .addCase(getList.pending, (state) => {
			})
			.addCase(getList.fulfilled, (state, action) => {
				state.users=action.payload;
			})
	},
})


export default userSlice.reducer