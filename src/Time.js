import DatePicker from 'react-datepicker';
import React, { useState } from 'react';
import './GuestInfo.css';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import './Time.css';
import { db } from "./firebase";

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

      const generateHoursArray = (start, end) => {
        const hours = [];
        let currentTime = new Date(start);
        const adjustedEndTime = new Date(end.getTime() + 60 * 1000);
        while (currentTime <= adjustedEndTime) {
          hours.push(currentTime.getHours());
          currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1시간 추가
        }
      
        return hours;
      };
    
      const handleButtonClick = async() => {
        let timeArray = [];
        for (const time of times){
            console.log(time.startTime, time.deadlineTime);
            timeArray = timeArray.concat(generateHoursArray(time.startTime, time.deadlineTime));
        }
        const storedDate = JSON.parse(localStorage.getItem("currentdate"));
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log(storedDate);
        var currentdate = new Date(storedDate);
        currentdate.setDate(currentdate.getDate());

        const storedValue = localStorage.getItem('currentRoom');
        const parsedValue = JSON.parse(storedValue);
 
        const collectionRef = collection(db, "DateInfo");
    
        let boolean = false;
        const querySnapshot = await getDocs(collection(db, 'DateInfo'));
        for (const docSnapShot of querySnapshot.docs) {
            if (parsedValue.name === docSnapShot.data().RoomName && docSnapShot.data().name === storedUser.displayName && docSnapShot.data().email === storedUser.email && docSnapShot.data().date.toDate().toISOString() === currentdate.toISOString()){
                    // 기존 문서가 존재할 때, 해당 문서의 'times' 필드에 새로운 시간을 추가
                    const existingData = docSnapShot.data();
                    const updatedTimes = Array.from(new Set(existingData.times.concat(timeArray)));
                    const docRef = doc(db, 'DateInfo', docSnapShot.id);
                    await updateDoc(docRef, { times: updatedTimes });
                    console.log("종료");
                    // 루프 종료
                    boolean = true;
                    return;
                
            }
        }

        if (!boolean){
                const firestoreUserData = {
                    name: storedUser.displayName,
                    email: storedUser.email,
                    date: currentdate,
                    times: timeArray,
                    RoomName: parsedValue.name
                }  
    
            console.log(firestoreUserData);
            await addDoc(collectionRef, firestoreUserData);
            

        };
            
        
        handleShare(); // handleShare 함수 실행
      };


    return (
        <div>
            <div className="content container">
                <div className="form-container">
                    <label>시간을 입력해주세요</label>
                    <label>[+]버튼을 누르면 시간을 추가로 기입할 수 있습니다</label>
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