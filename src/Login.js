import React from 'react';
import './Login.css';
import { auth, signInWithEmailAndPassword, db } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function Login() {
    const [userData, setUserData] = useState(null);
    //const [registerEmail, setRegisterEmail] = useState("");
    //const [registerPassword, setRegisterPassword] = useState("");
    //const [errorMsg, setErrorMsg] = useState("　");
    const [typingEmail, setTypingEmail] = useState(''); // 이메일 입력값
    const [typingPassword, setTypingPassword] = useState(''); // 비밀번호 입력값
    const [user, setUser] = useState(null); // 로그인된 사용자 정보
    const [isAppropriate, setIsAppropriate] = useState(true); // 로그인 유효성 여부
    //const [userName, setUserName] = useState("");

    const handleShare = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const roomName = urlSearchParams.get('roomName');
        const startDate = urlSearchParams.get('startDate');
        const endDate = urlSearchParams.get('endDate');

        let currentRoom = JSON.parse(localStorage.getItem('currentRoom')) || [];

        if (roomName && startDate && endDate) {
            const newRoom = {
                name: roomName,
                startDate: startDate,
                endDate: endDate,
            };

            currentRoom.push(newRoom);

            localStorage.setItem('currentRoom', JSON.stringify(currentRoom));
        }

        await login(); // login 함수 실행
    };

    const login = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, typingEmail, typingPassword);
            // console.log(curUserInfo);
            setUser(result.user);
            const userData = result.user;
            alert('로그인 완료');
            window.history.back();
            localStorage.setItem('currentUser', JSON.stringify(userData));
        } catch (err) {
            setIsAppropriate(false);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);

            const userData = result.user;
            const urlSearchParams = new URLSearchParams(window.location.search);
            const roomName = urlSearchParams.get('roomName');
            const startDate = urlSearchParams.get('startDate');
            const endDate = urlSearchParams.get('endDate');

            let currentRoom = JSON.parse(localStorage.getItem('currentRoom')) || [];

            // 방 정보가 있을 경우 로컬 스토리지에 저장
            if (roomName && startDate && endDate) {
                const newRoom = {
                    name: roomName,
                    startDate: startDate,
                    endDate: endDate,
                };
    
                currentRoom.push(newRoom);
    
                localStorage.setItem('currentRoom', JSON.stringify(currentRoom));
            }

            const confirmation = window.confirm('로그인이 완료되었습니다. 창을 닫으시겠습니까?');
            if (confirmation) {
                window.close(); // 사용자가 확인하면 창을 닫습니다.
            }
            localStorage.setItem('currentUser', JSON.stringify(userData));
            console.log("로그인 성공")
        } catch (err) {
            console.error(err);
        }
    };

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
            <div>{userData ? '당신의 이름은 : ' + userData.displayName : ''}</div>

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
                <button onClick={handleShare} className="custom-button">
                    SIGN
                </button>
            </div>
        </div>
    );
}

export default Login;
