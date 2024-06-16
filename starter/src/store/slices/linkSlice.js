import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { navigate } from "react-router-dom"; // Import navigate instead of useNavigate

import API from 'services/ApiService';
const user= JSON.parse(localStorage.getItem('user'));

export const initialState = {
	loading: false,
	message: '',
    links:[],
	showMessage: false,
    redirect: null,
}

  export const createLink = createAsyncThunk(
	"link/create",
	async (data) => {
        const userId=user.id;
        const newData={...data,userId};
		const response = await API("/api/create-link", "post", newData);
		return response.data;
	
	}
  
  )
  export const getList = createAsyncThunk(
	"link/list",
	async () => {
		const response = await API(`/api/links/${user.id}`, "get", {});
		return response.data;
	
	}
	
  
  )
  export const updateLink = createAsyncThunk(
    "link/update",
    async (data) => {
		console.log("data",data)
        const userId=user.id;
        const newData={...data,userId};
        const response = await API(`/api/update-link`, "post", newData);
        return response.data;
    
    }
  )

  export const deleteLink = createAsyncThunk(
	"link/delete",
	async (linkId) => {
		const response = await API(`/api/delete-link/${linkId}`, "post", {});
		return response.data;
	
	}
	
  
  )
export const linkslice = createSlice({
	name: 'link',
	initialState,
	reducers: {},
    
	extraReducers: (builder) => {
		builder
			.addCase(createLink.pending, (state) => {
				state.loading = true;
			})
			.addCase(createLink.fulfilled, (state, action) => {
				state.loading = false;	
                window.location.href="/app/joinsociallinks/links";

            		})
			.addCase(createLink.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
            .addCase(updateLink.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateLink.fulfilled, (state, action) => {
				state.loading = false;
                window.location.href="/app/joinsociallinks/links";
			})

			.addCase(updateLink.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(deleteLink.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteLink.fulfilled, (state, action) => {
				state.loading = false;
				window.location.href="/app/joinsociallinks/links";
			})
            .addCase(getList.pending, (state) => {
			})
			.addCase(getList.fulfilled, (state, action) => {
				state.links=action.payload;
			})
	},
})


export default linkslice.reducer