import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './MyInfo.css';

function MyInfo() {
   const [RoomName,setRoomName] = useState('');
   const [name,setName] = useState('');
   const [title,setTitle] = useState('');
   const [startDate,setStartDate] = useState('');
   const [endDate,setEndDate] = useState('');
   const [noRoom, setNoRoom] = useState(false);

    
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      setName(storedUser.displayName);
      const RoomInfo = JSON.parse(localStorage.getItem("currentRoom"));
  
      
      // 여기에서 RoomInfo의 값을 상태로 설정
      if (RoomInfo) {
        setRoomName(RoomInfo.name);
        setTitle(RoomInfo.title);
        const startDate = new Date(RoomInfo.startDate);
        startDate.setDate(startDate.getDate() + 1);
        const endDate = new Date(RoomInfo.endDate);
        endDate.setDate(endDate.getDate() + 1);
        setStartDate(startDate.toISOString().split('T')[0]);
        setEndDate(endDate.toISOString().split('T')[0]);
      } else {
        setNoRoom(true); // Set noRoom to true when currentRoom data is absent
      }

    }, []);

    return (
      <div>
        <Header />
        <div className="ScheduledContainer">
          <div className="NameMeetingContainer">
            <p className="NameMeeting">{name}'s meetings</p>
          </div>
          {noRoom ? (
            <div className="NoRoomMessage">
              <p>현재 참가중인 방이 없습니다.</p>
            </div>
          ) : (
            <Link to="/CalendarPage">
              <button>
                <div className="RoomInfo">
                  <div className="headerTextStyleContainer">
                    <p className="headerTextStyle">Not Scheduled</p>
                  </div>
                  <div className="infoContainer">
                    <p>{RoomName}</p>
                    <p>{title}</p>
                    <p>{startDate} ~ {endDate}</p>
                  </div>
                </div>
              </button>
            </Link>
          )}
        </div>
        <Footer />
      </div>
    );
  }
  

  
export default MyInfo;