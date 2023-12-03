//import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
// import { faSquare } from '@fortawesome/free-regular-svg-icons';
// import { freebsd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { auth } from "./firebase";
// <a href>를 사용하면 warning이 나와서 <Link to>로 변경했습니다.


function Header() {
    //로그인 시 로그인버튼과 회원가입 버튼을 없앨 때 로그인 상태인지 확인하는 코드
    const [user, setUser] = useState(null);

    useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
    }, []);

    const handleLogout = () => {
        // 로그아웃 처리
        auth.signOut()
          .then(() => {
            // 로그아웃 성공 시 처리할 내용
            localStorage.removeItem('currentUser');
            setUser(null);
            alert('로그아웃 되었습니다.');
          })
          .catch((error) => {
            // 로그아웃 실패 시 처리할 내용
            console.log(error);
          });
      };
    return (
        <header className="bg-light p-3">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <FontAwesomeIcon icon={faCalendar} /> <span>Mannam2</span>
                </Link>
                <div className="menu-bar">
                            {user ? (
                        <>
                        <button className="btn btn-outline-secondary me-2" onClick={handleLogout}>
                            로그아웃
                        </button>
                        <Link to="/MyInfo" className="btn btn-outline-secondary me-2">
                            내정보
                        </Link>
                        </>
                    ) : (
                        <>
                        <Link to="/login" className="btn btn-outline-secondary me-2">
                            로그인
                        </Link>
                        <Link to="/SignUp" className="btn btn-outline-secondary me-2">
                            회원가입
                        </Link>
                        </>
                    )}
                    <Link to="/terms" className="btn btn-outline-secondary me-2">
                        이용약관
                    </Link>
                    <Link to="/others" className="btn btn-outline-secondary">
                        기타
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
