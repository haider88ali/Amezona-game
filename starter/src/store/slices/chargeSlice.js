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
		const response = await API("/api/create-charge", "post", newData);
		return response.data;
	
	}
  )
export const chargeslice = createSlice({
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

	},
})


export default chargeslice.reducer