import {createSlice} from "@reduxjs/toolkit";

const initialState= {
    currentUser: {
        uid: '',
        photoURL: '',
        displayName: ''
    }
}

export const userSilce = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
})

export default userSilce.reducer;