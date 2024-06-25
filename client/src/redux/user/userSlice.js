import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser:null,
    error:null,
    loading:false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error =action.payload;
            state.loading = false;
        },
        SignOutUserStart: (state) => {
            state.loading = true;
        },
        SignOutUserSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        SignOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        
    },
});

export const {signInStart , signInSuccess , signInFailure ,SignOutUserFailure,SignOutUserSuccess,SignOutUserStart} = userSlice.actions;

export default userSlice.reducer;

