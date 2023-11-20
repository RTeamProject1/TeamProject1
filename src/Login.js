import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div class="login-box">
            <h2>소셜로그인으로 간편하게 로그인</h2>
            <a href="#" class="social-button" id="apple-connect">
                {' '}
                <span>Log in with Apple</span>
            </a>
            <a href="#" class="social-button" id="google-connect">
                {' '}
                <span>Log in with Google</span>
            </a>
        </div>
    );
}

export default Login;
