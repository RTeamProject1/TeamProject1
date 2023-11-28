import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';
import moment from 'moment';
function CalendarPage() {
    const [participants] = useState(['Participant 1', 'Participant 2', 'Participant 3']);
    const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState(new Date());
    const [dataDates, setDataDates] = useState([]); // 데이터가 있는 일자 목록

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };
    console.log("날짜 : ", date);
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    //const storedUser = JSON.parse(localStorage.getItem("room"));
    console.log("시간 : ", storedUser);

    localStorage.setItem('currentdate', JSON.stringify(date));
    
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };
    
    const handleOpenPopup = () => {
        Window = window.open('Time', 'popup', 'width=500,height=500');
        if (selectedDate) {
            setDataDates((prevDataDates) => [...prevDataDates, selectedDate]);
          }
      };
    const isDataDate = (date) => {
        // 데이터가 있는 일자인지 확인하는 함수
        return dataDates.some((dataDate) => moment(dataDate).isSame(date, 'day'));
    };
    return (
        <>
            <Header />
            <div className="container">
                <div className="calendar-container">
                    <Calendar
                        className="calendar"
                        //onChange={setDate}
                        //value={date}
                        formatDay={(locale, date) => moment(date).format('DD')}
                        calendarType={'US'}
                        //onChange={handleDateClick}
                        onChange={setDate}
                        value={selectedDate}
                        onClickDay={handleDateClick}
                        tileClassName={({ date, view }) =>
                            view === 'month' && isDataDate(date) ? 'has-data' : ''
                        }
                    />
                    <button className="btn btn-success submit-btn" onClick={handleOpenPopup}>
                        일정 넣기
                    </button>
                </div>
                <div className="participants-container">
                    <Link to="/GuestInfo">
                        <button className="btn btn-success submit-btn me-3">참가하기</button>
                    </Link>
                    <button className="btn btn-success submit-btn" onClick={handleShare}>
                        공유하기
                    </button>

                    <h2>참여자 목록</h2>
                    {participants.map((participant, index) => (
                        <p key={index}>{participant}</p>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CalendarPage;
