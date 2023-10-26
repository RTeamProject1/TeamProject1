import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// <a href>를 사용하면 warning이 나와서 <Link to>로 변경했습니다.

function Header() {
    return (
        <header className="bg-light p-3">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                    로고
                </Link>
                <div className="menu-bar">
                    <Link to="/signup" className="btn btn-outline-secondary me-2">
                        회원가입
                    </Link>
                    <Link to="/login" className="btn btn-outline-secondary me-2">
                        로그인
                    </Link>
                    <Link to="/terms" className="btn btn-outline-secondary me-2">
                        이용약관
                    </Link>
                    <Link to="/others" className="btn btn-outline-secondary">
                        기타
                    </Link>
                </div>
            </div>
        </header>
/*
function Header() {
    return (
        <header className="bg-light p-3">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                    로고
                </Link>
                <div className="menu-bar">
                    <a href="#" className="btn btn-outline-secondary me-2">
                        회원가입
                    </a>
                    <a href="#" className="btn btn-outline-secondary me-2">
                        로그인
                    </a>
                    <a href="#" className="btn btn-outline-secondary me-2">
                        이용약관
                    </a>
                    <a href="#" className="btn btn-outline-secondary">
                        기타
                    </a>
                </div>
            </div>
        </header>
        */
        // <header>
        //     <nav className="navbar">
        //         <a href="/" className="logo">
        //             Logo
        //         </a>
        //         <div className="nav-links">
        //             <a href="/signup" className="nav-link">
        //                 회원가입
        //             </a>
        //             <a href="/login" className="nav-link">
        //                 로그인
        //             </a>
        //             <a href="/support" className="nav-link">
        //                 고객센터
        //             </a>
        //         </div>
        //     </nav>
        // </header>
    );
}

export default Header;
