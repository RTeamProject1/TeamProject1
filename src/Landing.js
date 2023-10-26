import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Landing.css';
import { Link } from 'react-router-dom';
function Landing() {
    return (
        <>
            <Header />
            <div className="container-box">
                <Link to="/CreateRoom">
                    <button className="btn btn-success submit-btn btn-lg">방만들기</button>
                </Link>
            </div>
            <Footer />
        </>
    );
}

export default Landing;
