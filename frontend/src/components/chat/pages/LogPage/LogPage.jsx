import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth";
import app, {db} from "../../firebase";
import {useForm} from "react-hook-form";
import md5 from "md5";
import {ref, set} from "firebase/database";

const LogPage = () => {

    const auth = getAuth(app);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorFromSubmit, setErrorFromSubmit] = useState("");
    const {register, watch, formState: { errors }, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try{
            setLoading(true);
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate('/chat');

        }catch (error){
            console.error(error);
            setErrorFromSubmit(error.message);  // 에러 메시지를 state 빈값에 담아서 보여준다.
            setTimeout(() =>{   // 에러 메시지 출력 시간 조절, 현재는 3초
                setErrorFromSubmit("");
            }, 3000);
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className='auth-wrapper'>
            <div style={{textAlign: 'center'}}>
                <h3>Login</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='email'>Email</label>
                <input
                    name='email'
                    type='email'
                    id='email'
                    {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                />
                {errors.email && <p>This email field is required</p>}

                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    {...register("password", {required: true, minLength: 6})}
                />
                {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
                {errors.password && errors.password.type === "minLength" &&
                    <p>Password must have at least 6 characters</p>}

                {errorFromSubmit && <p>{errorFromSubmit}</p>}

                <input type='submit' disabled={loading}/>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={'/register'}>아직 아이디가 없다면..</Link>
            </form>
        </div>
    )
}

export default LogPage;