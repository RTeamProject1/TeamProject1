import React from 'react';
import './Login.css';
import { auth,  signInWithEmailAndPassword } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link } from 'react-router-dom';

function Login() {
    const [userData, setUserData] = useState(null);
    //const [registerEmail, setRegisterEmail] = useState("");
    //const [registerPassword, setRegisterPassword] = useState("");
    //const [errorMsg, setErrorMsg] = useState("　");
    const [typingEmail, setTypingEmail] = useState(""); // 이메일 입력값
    const [typingPassword, setTypingPassword] = useState(""); // 비밀번호 입력값
    const [user, setUser] = useState(null); // 로그인된 사용자 정보
    const [isAppropriate, setIsAppropriate] = useState(true); // 로그인 유효성 여부
    //const [userName, setUserName] = useState("");

    const handleShare = async () => {
      await login(); // login 함수 실행
    };

    const login = async () => {
      try {
        const curUserInfo = await signInWithEmailAndPassword(auth, typingEmail, typingPassword);
        // console.log(curUserInfo);
        setUser(curUserInfo.user);
        alert('로그인 완료');
        window.history.back();
      } catch(err){
        setIsAppropriate(false);
        // console.log(err.code);
        /*
        입력한 아이디가 없을 경우 : auth/user-not-found.
        비밀번호가 잘못된 경우 : auth/wrong-password.
        */
      }
    }

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console에 UserCredentialImpl 출력
        const userData = {
            name : data._tokenResponse.displayName,
            email : data._tokenResponse.email
        }
        localStorage.setItem('currentUser', JSON.stringify(userData));
      })
      .catch((err) => {
        console.log(err);
      });
    }

    return (
        <div class="login-box">
            <h2>Sign in</h2>
            {/*<a href="#" class="social-button" id="apple-connect">
                {' '}
                <span>Log in with Apple</span>
            </a>*/}
            <a href="#" onClick={handleGoogleLogin} class="social-button" id="google-connect">
                {' '}
                <span>Sign in with Google</span>
            </a>
            <div>
              {userData
                ? "당신의 이름은 : " + userData.displayName
                : ""}
            </div>
            
            <div className="container1">
                <h3>or use your account</h3>
                <input
                    type="email"
                    placeholder="Email"
                    value={typingEmail}
                    onChange={(e) => setTypingEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={typingPassword}
                    onChange={(e) => setTypingPassword(e.target.value)}
                />
                <button onClick={handleShare} className="custom-button">SIGN</button>
            </div>
        </div>
    );
}

export default Login;
