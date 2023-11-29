import React from 'react';
import './Login.css';
import { auth,  signInWithEmailAndPassword, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { collection, addDoc, getDocs } from 'firebase/firestore';

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

    
    const login = async () => {
      try {
        const curUserInfo = await signInWithEmailAndPassword(auth, typingEmail, typingPassword);
        // console.log(curUserInfo);
        setUser(curUserInfo.user);
        console.log("로그인 성공")
      } catch(err){
        setIsAppropriate(false);
        // console.log(err.code);
        /*
        입력한 아이디가 없을 경우 : auth/user-not-found.
        비밀번호가 잘못된 경우 : auth/wrong-password.
        */
      }
    }

    const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider();
    
      try {
        const result = await signInWithPopup(auth, provider);
        const userData = result.user;
    
        console.log(userData);
    
        const storedValue = localStorage.getItem('currentRoom');
        const parsedValue = JSON.parse(storedValue);
        console.log(storedValue);
    
        if (storedValue !== null) {
          const UserInfo = {
            name: parsedValue.name,
            startDate: parsedValue.startDate,
            endDate: parsedValue.endDate,
            maxPeople: parsedValue.maxPeople,
            deadlineTime: parsedValue.deadlineTime,
            userName: userData.displayName,
            userEmail: userData.email
          };
          console.log('roomInfo:', UserInfo);
          localStorage.setItem('currentUser', JSON.stringify(UserInfo));
          await addDoc(collection(db, "UserInfo"), UserInfo);
        }

      } catch (err) {
        console.error(err);
      }
    };
    

    return (
        <div class="login-box">
            <h2>소셜로그인으로 간편하게 로그인</h2>
            {/*<a href="#" class="social-button" id="apple-connect">
                {' '}
                <span>Log in with Apple</span>
            </a>*/}
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
