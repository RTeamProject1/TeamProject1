import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
//import InputMask from 'react-input-mask';

import 'react-datepicker/dist/react-datepicker.css';
import './CreateRoom2.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function CreateRoom2() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomName, setRoomName] = useState('');
    const [maxPeople, setMaxPeople] = useState('');
    const [deadlineTime, setDeadlineTime] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };
    
    const handleMaxPeopleChange = (e) => {
        setMaxPeople(e.target.value);
    };
    
    const handleDeadlineTimeChange = (date) => {
        setDeadlineTime(date);
    };

    const saveRoom = () => {
        const roomInfo = {
            name: roomName,
            startDate: startDate,
            endDate: endDate,
            maxPeople: maxPeople,
            deadlineTime: deadlineTime
        };

        // Convert the object to a JSON string and store it in localStorage
        localStorage.setItem('room', JSON.stringify(roomInfo));
        console.log(`방 정보: 이름 - ${roomName}, 시작 날짜 - ${startDate}, 종료 날짜 - ${endDate}, 최대 인원 - ${maxPeople}, 마감 시간 - ${deadlineTime}`);
    };


    return (
        <div>
            <Header />

            <div className="container">
                <div className="form-container">
                    <label>방이름을 정해주세요</label>
                    <input
                        type="text"
                        placeholder="방 이름"
                        value={roomName}
                        onChange={handleRoomNameChange}
                    />
                    <label>대략적인 기간을 입력해주세요</label>
                    <div className="date-range">
                        <DatePicker
                            placeholderText="언제부터"
                            selected={startDate}
                            onChange={(date) => handleStartDateChange(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                        <DatePicker
                            placeholderText="언제까지"
                            selected={endDate}
                            onChange={(date) => handleEndDateChange(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </div>
                    <label>모임의 최대인원을 입력해주세요</label>
                    <select value={maxPeople} onChange={handleMaxPeopleChange} className="max-people">
                        
                        <option value="">선택하세요</option>
                        {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <label>투표 마감시간을 정해주세요</label>
                    <DatePicker
                        selected={deadlineTime}
                        onChange={handleDeadlineTimeChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="시간"
                        dateFormat="h:mm aa"
                        placeholderText="마감시간"
                    />
                    <div className="button-wrapper">
                        <Link to="/CalanderPage">
                            <button className="btn btn-success submit-btn" onClick={saveRoom}>완료</button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateRoom2;
