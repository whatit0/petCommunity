import React, { useState, useEffect, useRef } from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut, updateProfile, onAuthStateChanged } from 'firebase/auth';
import app, { db, storage } from '../../../firebase';
import { ref as strRef, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { setPhotoUrl } from '../../../store/userSlice';
import { update, ref as dbRef, get as getDatabase } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const UserPanel = () => {
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const inputOpenImageRef = useRef(null);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    // Redux 스토어에서 currentUser 가져오기
    const { currentUser } = useSelector((state) => state.user);

    // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번만 사용자 정보를 가져오도록 변경
    useEffect(() => {
        // onAuthStateChanged 이벤트 리스너 등록
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // 사용자의 UID를 기반으로 Realtime Database에서 사용자 정보 가져오기
                const uid = user.uid;
                // Realtime Database에서 사용자 정보를 가져오기 위한 참조 생성
                const userRef = dbRef(db, `users/${uid}`);

                // 한 번만 데이터를 읽어오기
                getDatabase(userRef)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const userData = snapshot.val();
                            const userNickname = userData.userNickname;
                            console.log('사용자의 닉네임:', userNickname);
                            // 가져온 사용자 정보를 state에 저장
                            setUserInfo(userData);
                            console.log('asdad',userData)
                        } else {
                            console.log('사용자 정보가 존재하지 않습니다.');
                        }
                    })
                    .catch((error) => {
                        console.error('데이터를 가져오는 중에 오류 발생:', error);
                    });
            } else {
                // 로그아웃 상태일 때, 사용자 정보 초기화
                setUserInfo(null);
            }
        });
        // 컴포넌트 언마운트 시 이벤트 리스너 해제
        return () => unsubscribe();
    }, [auth]); // currentUser가 변경될 때마다 실행



    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click();
    };

    const handleUploadImage = (event) => {
        const file = event.target.files[0];
        const user = auth.currentUser;

        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: file.type,
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = strRef(storage, 'user_image/' + user.uid);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    // 프로필 이미지 수정
                    updateProfile(user, {
                        photoURL: downloadURL,
                    });
                    // 리덕스 스토어 이미지 데이터 수정
                    dispatch(setPhotoUrl(downloadURL));
                    // 데이터베이스 유저 이미지 수정
                    update(dbRef(db, `users/${user.uid}`), { image: downloadURL });
                });
            }
        );
    };
    console.log(currentUser);

    return (
        <div>
            <h3 style={{ color: 'white' }}>
                <IoIosChatboxes /> 회원 채팅
            </h3>

            <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <Image src={currentUser.photoURL} roundedCircle style={{ width: 30, height: 30, marginTop: 3 }} />
                <Dropdown>
                    <Dropdown.Toggle style={{ backgroundColor: 'transparent', border: 0 }}>
                        {userInfo?.userNickname}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleOpenImageRef}>프로필 사진 변경</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <input onChange={handleUploadImage} type="file" ref={inputOpenImageRef} style={{ display: 'none' }} accept="image/jpeg, image/png" />
        </div>
    );
};

export default UserPanel;
