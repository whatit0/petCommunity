import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import chatRoomReducer from './chatRoomSlice';

export const store = configureStore({
    reducer:{
        user: userReducer,
        chatRoom: chatRoomReducer
    }
})