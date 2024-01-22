import React from 'react';
import UserPanel from "./UserPanel";
import Favorite from "./Favorite";
import ChatRooms from "./ChatRooms";
import DirectMessages from "./DirectMessages";

const SidePanel = () => {
    return (
        <div style={{
            backgroundColor: '#7B83EB',
            padding: '2rem',
            minHeight: '100vh',
            color:'white',
            minWidth: '275px'
        }}>
            <UserPanel/>

            <Favorite/>

            <ChatRooms/>

            <DirectMessages/>
        </div>
    );
};

export default SidePanel;