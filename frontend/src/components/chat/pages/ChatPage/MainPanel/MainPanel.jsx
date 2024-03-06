import React, {useEffect, useRef, useState} from 'react';
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";
import {child, onChildAdded, off, ref as dbRef, onChildRemoved, getDatabase, get} from "firebase/database";
import app, {db} from '../../../firebase';
import {useDispatch, useSelector} from "react-redux";
import Message from "./Message";
import {setUserPosts} from "../../../store/chatRoomSlice";
import Skeleton from "../../../Skeleton";
import {getAuth} from "firebase/auth";

const MainPanel = () => {

    const messagesRef = dbRef(db, "messages");
    const typingRef = dbRef(db, "typing");

    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);

    const {currentUser} = useSelector(state => state.user);
    const {currentChatRoom} = useSelector(state => state.chatRoom);

    const messageEndRef = useRef(null);
    const dispatch = useDispatch();

    const auth = getAuth(app);

    // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번만 사용자 정보를 가져오도록 변경
    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            // 사용자의 UID를 기반으로 Realtime Database에서 사용자 정보 가져오기
            const userRef = dbRef(getDatabase(), `users/${user.uid}`);

            // 한 번만 데이터를 읽어오기
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    console.log('userData',userData)
                } else {
                    console.log('사용자 정보가 존재하지 않습니다.');
                }
            }).catch((error) => {
                console.error('데이터를 가져오는 중에 오류 발생:', error);
            });
        }
    }, [auth.currentUser]); // auth.currentUser가 변경될 때마다 실행

    useEffect(() => {
        messageEndRef.current.scrollIntoView({behavior:'smooth'});
    })

    useEffect(() => {
        if (currentChatRoom.id){
        addMessagesListener(currentChatRoom.id);
            addTypingListeners(currentChatRoom.id);
        }
        return () => {
            off(messagesRef);
        }
    }, [currentChatRoom.id])

    const addTypingListeners = (chatRoomId) => {
        let typingUsers = [];

        onChildAdded(child(typingRef, chatRoomId), DataSnapshot => {
            if (DataSnapshot.key !== currentUser.uid) {
                typingUsers = typingUsers.concat({
                    id: DataSnapshot.key,
                    name: DataSnapshot.val()
                });
                setTypingUsers(typingUsers);
            }
        })
        onChildRemoved(child(typingRef, chatRoomId), DataSnapshot => {
            const index = typingUsers.findIndex(user => user.id === DataSnapshot.key);
            if (index !== -1) {
                typingUsers = typingUsers.filter(user => user.id !== DataSnapshot.key);
                setTypingUsers(typingUsers);
            }
        })
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setSearchLoading(true);
        handleSearchMessage(event.target.value)
    }

    const handleSearchMessage = (searchTerm) => {
        const chatRoomMessages = [...messages]
        const regex = new RegExp(searchTerm, 'gi');
        const searchResults = chatRoomMessages.reduce((acc, message) => {
            if (
                (message.content && message.content.match(regex))
            ) {
                acc.push(message);
            }
            return acc;
        }, []);
        setSearchResults(searchResults);
        setSearchLoading(false);
    }

    const addMessagesListener = (chatRoomId) => {
        let messagesArray = [];
        setMessages([]);
        onChildAdded(child(messagesRef, chatRoomId), DataSnapshot => {
            messagesArray.push(DataSnapshot.val());

            const newMessageArray = [...messagesArray];
            setMessages(newMessageArray);
            setMessagesLoading(false);
            userPostsCount(newMessageArray);
        })
    }

    const userPostsCount = (messages) => {
        const userPosts = messages.reduce((acc, message) => {
            if (message.user.name in acc) {
                acc[message.user.name].count += 1;
            } else {
                acc[message.user.name] = {
                    image: message.user.image,
                    count: 1
                }
            }
            return acc;
        }, {})
        dispatch(setUserPosts(userPosts))
    }

    const renderMessages = (messages) => {
        return messages.length > 0 && messages.map((message) => (
            <Message
                key={message.timestamp}
                message={message}
                user={currentUser}
            />
        ))
    }

    const renderTypingUsers = (typingUsers) =>
        typingUsers.length > 0 &&
        typingUsers.map(user => (
            <span key={user.name.userUid}>
                {user.name.userUid}님이 채팅을 입력중입니다...
            </span>
        ))

    const renderMessageSkeleton = (loading) =>
        loading && (
            <>
                {[...Array(13)].map((_, i) => (
                    <Skeleton key={i}/>
                ))}
                <Skeleton/>
            </>
        )

    return (
        <div style={{padding:'2rem 2rem 0 2rem'}}>
            <MessageHeader handleSearchChange={handleSearchChange}/>

            <div style={{
                width:'100%',
                height:450,
                border:'0.2rem solid #ececec',
                borderRadius:'4px',
                padding:'1rem',
                marginBottom:'1rem',
                overflowY:'auto'
            }}>
                {renderMessageSkeleton(messagesLoading)}
                {searchLoading && <div>loading...</div>}
                {searchTerm ? renderMessages(searchResults) : renderMessages(messages)}
                {renderTypingUsers(typingUsers)}
                <div ref={messageEndRef} style={{padding:'1rem'}}/>
            </div>

            <MessageForm/>
        </div>
    );
};

export default MainPanel;