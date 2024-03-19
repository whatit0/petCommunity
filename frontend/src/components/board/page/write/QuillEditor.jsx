import React, {useState, useMemo, useRef} from 'react'; // useState와 useMemo를 import
import ReactQuill, {Quill} from 'react-quill'; // { Quill } 제거
import { storage } from '../../../chat/firebase';
import { getDownloadURL, ref as strRef, uploadBytesResumable } from "firebase/storage";
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';

Quill.register("modules/ImageResize", ImageResize);

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
    'image',
];

const QuillEditor = ({ onChange }) => { // 'export default function' 제거 및 정의 방식 변경
    const [values, setValues] = useState(""); // 초기값 설정 (예: 빈 문자열)
    const quillRef = useRef(null);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;
            const fileRef = strRef(storage, `images/board/${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // 업로드 진행 상황을 사용자에게 표시할 수 있음
                },
                (error) => {
                    console.error("Image upload failed:", error);
                    // 에러 처리 로직
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const range = quillRef.current.getEditor().getSelection(true);
                        quillRef.current.getEditor().insertEmbed(range.index, 'image', downloadURL);
                    });
                }
            );
        };
    };

    const handleChange = (content, delta, source, editor) => {
        if (quillRef.current && quillRef.current.editor) {
            const html = quillRef.current.editor.root.innerHTML;
            setValues(html);
            onChange(html);
        }
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: "#toolbar",
                handlers: {
                    'image': imageHandler,
                }
            },
            ImageResize: {
                parchment: Quill.import("parchment"),
                modules: ["Resize", "DisplaySize"],
            },
        };
    }, []);


    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            modules={modules}
            formats={formats}
            value={values} // value 속성 추가
            onChange={handleChange}
        />
    );
};

export default QuillEditor;