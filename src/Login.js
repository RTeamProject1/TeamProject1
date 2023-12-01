import React from 'react';
import './Login.css';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link } from 'react-router-dom';

function Login() {
    const [userData, setUserData] = useState(null);
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("　");
    const [typingEmail, setTypingEmail] = useState(""); // 이메일 입력값
    const [typingPassword, setTypingPassword] = useState(""); // 비밀번호 입력값
    const [user, setUser] = useState(null); // 로그인된 사용자 정보
    const [isAppropriate, setIsAppropriate] = useState(true); // 로그인 유효성 여부
    const [userName, setUserName] = useState("");

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

   
        console.log("회원가입 성공");
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
          }
        }
    }  
    const login = async () => {
      try {
        const curUserInfo = await signInWithEmailAndPassword(auth, typingEmail, typingPassword);
        // console.log(curUserInfo);
        setUser(curUserInfo.user);
        localStorage.setItem('currentUser', JSON.stringify(curUserInfo.user));
        console.log("로그인 성공")
        const userData = {
          email: user.registerEmail,
          displayName: user.displayName // 이 이름을 추가하여 저장할 수 있습니다.
          };
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
      <div>
                <h3>회원가입</h3>
                <input
                    type="email"
                    placeholder="이메일"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="이름"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={register}>회원가입</button>
                {errorMsg && <p>{errorMsg}</p>}
            </div>
            <div>
                <h3>로그인</h3>
                <input
                    type="email"
                    placeholder="이메일"
                    value={typingEmail}
                    onChange={(e) => setTypingEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={typingPassword}
                    onChange={(e) => setTypingPassword(e.target.value)}
                />
                <button onClick={login}>로그인</button>
            </div>
        </div>
    );
}

export default Login;
