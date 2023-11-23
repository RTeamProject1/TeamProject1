import React, { useState } from 'react';
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

   const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };
   const handleNameChange = (e) => {
        setName(e.target.value);
    };
   const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
   const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    };
   const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    };
    
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