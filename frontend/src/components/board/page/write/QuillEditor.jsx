import React, { useState, useMemo } from 'react'; // useState와 useMemo를 import
import ReactQuill from 'react-quill'; // { Quill } 제거
import 'react-quill/dist/quill.snow.css';

const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size',
    'h1',
];

const QuillEditor = ({ onChange }) => { // 'export default function' 제거 및 정의 방식 변경
    const [values, setValues] = useState(""); // 초기값 설정 (예: 빈 문자열)

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: "#toolbar",
            },
        };
    }, []);

    return (
        <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={values} // value 속성 추가
            onChange={onChange} // setValues
        />
    );
};

export default QuillEditor;