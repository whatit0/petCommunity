import {useLocation} from "react-router";
import {useState} from "react";
import "../style/notice.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function NoticeEdit() {
    const location = useLocation();
    const noticeData = location.state.data;
    const navigate = useNavigate();

    const [noticeNo, setNoticeNo] = useState(noticeData.noticeNo);
    const [title, setTitle] = useState(noticeData.noticeTitle);
    const [content, setContent] = useState(noticeData.noticeContent);
    const [imageURL, setImageURL] = useState(null);

    const handleImageChange = (e) => {
        setImageURL(e.target.files[0]);
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            noticeNo: noticeNo,
            noticeTitle: title,
            noticeContent: content,
            noticeURL: imageURL || noticeData.noticeURL
        };
        try {
            console.log(JSON.stringify(postData));
            const response = await axios.post('http://localhost:8080/api/noticeEdit', postData,{
                headers: {
                    'Content-Type': 'application/json',
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

    return (
        <div id='board'>
            <div className="sub_box">
                <div className="sub_top sub_write">
                    <div className="top sub_right_title">
                        <h2>공지사항</h2>
                    </div>
                    <form onSubmit={handleEditSubmit}>
                        <div className="flex">
                            <label>제목</label>
                            <input
                                type="text"
                                name="noticeTitle"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex">
                            <label>내용</label>
                            <textarea
                                name="noticeContent"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className="flex">
                            <label htmlFor="boardfilename">이미지 수정</label>
                            <input
                                type="file"
                                name="noticeURL"
                                onChange={handleImageChange}
                            />
                        </div>
                        <button type="submit">수정하기</button>
                    </form>
                </div>
            </div >
        </div >
    );
}

export default NoticeEdit;