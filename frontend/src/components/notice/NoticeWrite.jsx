import axios from "axios";
import React, {useEffect, useState} from "react";
import "../style/notice.css";
import { useNavigate } from "react-router-dom";
import {getDownloadURL, ref as strRef, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "../chat/firebase";
import {child, push, ref as dbRef, set} from "firebase/database";

function NoticeWrite() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const [percentage, setPercentage] = useState(0);
    const messagesRef = dbRef(db, 'messages');
    const [imageURL, setImageURL] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        const postData = {
            noticeTitle: title,
            noticeContent: content,
            noticeURL: imageURL
        };
        try {
            console.log(JSON.stringify(postData));
            const token = localStorage.getItem('userToken');
            console.log(token)
            const response = await axios.post('http://localhost:8080/api/noticeWrite', postData,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });
            if(response.status === 200) {
                console.log("글이 성공적으로 등록되었습니다.");
                console.log('aa',postData)
                navigate('/notice');
            } else {
                console.log("글 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("에러 발생: ", error)
        }
    };

    const handleUploadImage = (event) => {
        const file = event.target.files[0];

        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: file.type
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = strRef(storage, `images/notice/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setPercentage(Math.round(progress));
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
                // Handle upload errors
                console.error('Upload error:', error);
            },
            () => {
                // Upload completed successfully, now get the download URL
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        // Set the imageURL state with the download URL
                        setImageURL(downloadURL);
                        console.log('asadasf',imageURL)
                    })
                    .catch((error) => {
                        // Handle errors while getting the download URL
                        console.error('Error getting download URL:', error);
                    });
            }
        );
    };
    useEffect(() => {
        console.log('asadasf', imageURL);
    }, [imageURL]);


    return (
        <div id='board'>
            <div className="sub_box">
                <div className="sub_top sub_write">
                    <div className="top sub_right_title">
                        <h2>공지사항</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex">
                            <label htmlFor="noticeTitle">제목</label>
                            <input
                                type="text"
                                id="noticeTitle"
                                name="noticeTitle"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex">
                            <label htmlFor="noticeContent">내용</label>
                            <textarea
                                id="noticeContent"
                                name="noticeContent"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className="flex">
                            <label>이미지</label>
                            <input
                                type="file"
                                onChange={handleUploadImage}
                            />
                        </div>
                        <button type="submit">작성하기</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NoticeWrite;