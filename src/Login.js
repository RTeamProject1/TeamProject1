import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="wrapper">
            <div className="login-container">
                <h1>간편 로그인</h1>
                <div className="button-container">
                    <Link to="#" className="btn btn-outline-secondary me-2">
                        애플로 로그인
                    </Link>

                    <Link to="#" className="btn btn-outline-secondary me-2">
                        구글로 로그인
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
