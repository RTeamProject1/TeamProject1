import React from 'react';
import './Login.css';
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link } from 'react-router-dom';

function Login() {
    const [userData, setUserData] = useState(null);

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
            <h2>소셜로그인으로 간편하게 로그인</h2>
            <a href="#" class="social-button" id="apple-connect">
                {' '}
                <span>Log in with Apple</span>
            </a>
            <a href="#" onClick={handleGoogleLogin} class="social-button" id="google-connect">
                {' '}
                <span>Log in with Google</span>
            </a>
      <div>
        {userData
          ? "당신의 이름은 : " + userData.displayName
          : "로그인 버튼을 눌러주세요 :)"}
      </div>
        </div>
    );
}

export default Login;
