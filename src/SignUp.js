import React from 'react';
import './SignUp.css';
import { auth, createUserWithEmailAndPassword, updateProfile } from "./firebase";
import { useState } from "react";
import { Link } from 'react-router-dom';

function SignUp() {
    //const [userData, setUserData] = useState(null);
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("　");
    //const [typingEmail, setTypingEmail] = useState(""); // 이메일 입력값
    //const [typingPassword, setTypingPassword] = useState(""); // 비밀번호 입력값
    //const [user, setUser] = useState(null); // 로그인된 사용자 정보
    //const [isAppropriate, setIsAppropriate] = useState(true); // 로그인 유효성 여부
    const [userName, setUserName] = useState("");

    /*const handleShare = () => {
        alert('저장되었습니다!');
        window.history.back();
    };*/
    const handleShare = async () => {
        await register(); // register 함수 실행
    };

    const register = async () => {
      try {
        setErrorMsg('　');
        const createdUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        //console.log(createdUser);
        setRegisterEmail("");
        setRegisterPassword("");
        const user = auth.currentUser;

    // 이름 정보 추가
        await updateProfile(user, {
        displayName: userName
        });

        const userData = {
        email: registerEmail,
        displayName: user.displayName // 이 이름을 추가하여 저장할 수 있습니다.
    };
        //localStorage.setItem('currentUser', JSON.stringify(userData));
        alert('회원 가입 완료했습니다');
        window.history.back();
      } catch(err){
        //console.log(err.code);
        switch (err.code) {
          case 'auth/weak-password':
            setErrorMsg('비밀번호는 6자리 이상이어야 합니다');
            break;
          case 'auth/invalid-email':
            setErrorMsg('잘못된 이메일 주소입니다');
            break;
          case 'auth/email-already-in-use':
            setErrorMsg('이미 가입되어 있는 계정입니다');
            break;
          default:
            break;
          }
        }
    }  
    return (
        <div class="SignUp-box">          
            <h4>Sign up</h4>
            <input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={handleShare} className="custom-button">Sign up</button>
            {errorMsg && <p>{errorMsg}</p>}
        </div>
        
    );
}

export default SignUp;