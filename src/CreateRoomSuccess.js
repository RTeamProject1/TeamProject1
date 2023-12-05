import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function CreateRoomSuccess() {
    return (
        <div className="page-container">
            <Header />
            <div className="success-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-calendar-check-fill" viewBox="0 0 16 16" color ="#7fb77e" margin_top = "100px">
            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
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