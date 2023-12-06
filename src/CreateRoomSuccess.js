import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function CreateRoomSuccess() {
    return (
        <div className="page-container">
            <Header />
            <div className="success-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16" color ="#7fb77e">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
                <h2 id="landingtext">방 생성 완료!</h2>
                <h2 id="landingtext2">친구들을 초대해 보세요!</h2>
                <Link to="/CalendarPage">
                    <button className="custom-button">계속하기</button>
                </Link>
            </div>
            <Footer />
        </div>
    );
}

export default CreateRoomSuccess;