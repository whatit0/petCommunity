import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {createUserWithEmailAndPassword, getAuth, updateProfile} from 'firebase/auth';
import {set, ref} from 'firebase/database';
import md5 from 'md5';
import app, { db } from '../../firebase';

const RegisterPage = () => {

    const auth = getAuth(app);

    const [loading, setLoading] = useState(false);
    const [errorFromSubmit, setErrorFromSubmit] = useState("");

    const {register, watch, formState: { errors }, handleSubmit} = useForm();

    const onSubmit = async (data) => {      // async : 비동기
        try{    // 비동기 요청은 주로 try-catch 문에서 처리를 해주기 때문에 에러가 나면 catch 문에서 에러 처리
            setLoading(true);
            // 파이어베이스에 요청을 보내고 유저를 생성한 다음 리턴
            const createdUser = await createUserWithEmailAndPassword(auth, data.email, data.password)    // 이메일과 비밀번호로 유저를 생성하는 함수
            console.log(createdUser);

            await updateProfile(auth.currentUser, {
                displayName: data.name,
                photoURL: `http://gravatar.com/avatar/${md5(
                    createdUser.user.email)}?d=identicon`
            })
            set(ref(db, `users/${createdUser.user.uid}`),{
                name: createdUser.user.displayName,
                image: createdUser.user.photoURL
            })

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
                <h3>Register</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='email'>Email</label>
                <input
                    name='email'
                    type='email'
                    id='email'
                    {...register("email", {required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p>This email field is required</p>}

                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    {...register("name", { required:true, maxLength:10})}
                />
                {errors.name && errors.name.type === "required" && <p>This name field is required</p>}
                {errors.name && errors.name.type === "maxLength" && <p>Your input exceed maximum length</p>}

                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    {...register("password", {required:true, minLength:6})}
                />
                {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
                {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}

                {errorFromSubmit && <p>{errorFromSubmit}</p>}

                <input type='submit' disabled={loading} />
                <Link style={{color: 'gray', textDecoration: 'none'}} to={'/log'}>이미 아이디가 있다면..</Link>
            </form>
        </div>
    )
}

export default RegisterPage


