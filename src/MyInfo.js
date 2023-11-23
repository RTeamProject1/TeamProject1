import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './MyInfo.css';

function MyInfo() {
   const [RoomName,setRoomName] = useState('');
   const [name,setName] = useState('');
   const [title,setTitle] = useState('');
   const [startTime,setStartTime] = useState('');
   const [endTime,setEndTime] = useState('');

    
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      setName(storedUser.name);
      const RoomInfo = JSON.parse(localStorage.getItem("RoomInfo"));
  
      // 여기에서 RoomInfo의 값을 상태로 설정
      setRoomName(RoomInfo.name);
      setTitle(RoomInfo.title);
      const startDate = new Date(RoomInfo.startDate);
      startDate.setDate(startDate.getDate() + 1);
      const endDate = new Date(RoomInfo.endDate);
      endDate.setDate(endDate.getDate() + 1);
      setStartTime(startDate.toISOString().split('T')[0]);
      setEndTime(endDate.toISOString().split('T')[0]);
      console.log(storedUser.name);
      console.log(RoomInfo);
    }, []);
    return (
      <div>
        <Header />
        <div className="ScheduledContainer">
            <div className="NameMeetingContainer">
                <p className="NameMeeting">{name}'s meetings</p>
            </div>
          <Link to="/CalendarPage">
            <button>
              <div className="RoomInfo">
                <div className="headterTextStyleContainer">
                  <p className="headterTextStyle">Not Scheduled</p>
                </div>
                <div className="infoContainer">
                  <p>{RoomName}</p>
                  <p>{title}</p>
                  <p>{startTime} ~ {endTime}</p>
                </div>
              </div>
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  
export default MyInfo;