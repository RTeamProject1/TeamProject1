import DatePicker from 'react-datepicker';
//import InputMask from 'react-input-mask';

import 'react-datepicker/dist/react-datepicker.css';
import './Time.css';
import { useState } from 'react'

function Time() {
    const [startTime, setStartTime] = useState(null);
    const [deadlineTime, setDeadlineTime] = useState(null);
    const [times, setTimes] = useState([{ startTime: null, deadlineTime: null }]);

    // '+' 버튼 클릭 시 추가적인  범위 입력 상자 생성
    const addTime = () => {
        setTimes([...times, { startTime: null, deadlineTime: null }]);
    };
    const handleShare = () => {
        alert('저장되었습니다!');
        window.close();
    };

    const handleStartTimeChange = (date, index) => {
        const updatedTimes = [...times];
        updatedTimes[index] = { ...updatedTimes[index], startTime: date };
        setStartTime(date);
        setTimes(updatedTimes);
      };
    
      const handleDeadlineTimeChange = (date, index) => {
        const updatedTimes = [...times];
        setDeadlineTime(date);
        updatedTimes[index] = { ...updatedTimes[index], deadlineTime: date };
        setTimes(updatedTimes);
      };
    const saveRoom = () => {
        const roomInfo = {
            startTime: startTime,
            deadlineTime: deadlineTime,
        };

        // Convert the object to a JSON string and store it in localStorage
        localStorage.setItem('room', JSON.stringify(roomInfo));
        console.log(
            `방 정보: 시작 시간 - ${startTime}, 종료 시간 - ${deadlineTime}`
        );
    };
    const handleButtonClick = () => {
        saveRoom(); // saveRoom 함수 실행
        handleShare(); // handleShare 함수 실행
      };

    return (
        <div>
            <div className="content container">
                <div className="form-container">
                    <label>시간을 입력해주세요</label>
                    <div className="time-range-container">
                        {times.map((time, index) => (
                            <div key={index} className="time-range">
                                <DatePicker
                                    selected={time.startTime}
                                    onChange={(date) => handleStartTimeChange(date, index)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={60}
                                    timeCaption="시간"
                                    dateFormat="h:mm aa"
                                    placeholderText="부터"
                                    className="time-picker"
                                />
                                <DatePicker
                                    selected={time.deadlineTime}
                                    onChange={(date) => handleDeadlineTimeChange(date, index)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={60}
                                    timeCaption="시간"
                                    dateFormat="h:mm aa"
                                    placeholderText="까지"
                                    className="time-picker"
                                />
                        </div>
                        ))}
                    </div>
                    <div>
                    <button className="add-time-button" onClick={addTime}>
                        +
                    </button>
                    </div>
                    <div className="button-wrapper">
                        <button className="btn btn-success submit-btn" onClick={handleButtonClick}>
                            저장
                        </button>
                    </div>
                </div>
            </div>  
        </div>   
    );
}


export default Time;