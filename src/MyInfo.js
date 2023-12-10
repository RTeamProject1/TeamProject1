import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './MyInfo.css';

function MyInfo() {
   const [userInfo, setUserInfo] = useState([]);
   const [RoomName,setRoomName] = useState('');
   const [name,setName] = useState('');
   const [title,setTitle] = useState('');
   const [startDate,setStartDate] = useState('');
   const [endDate,setEndDate] = useState('');
   const [noRoom, setNoRoom] = useState(false);

    
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      setName(storedUser.displayName);
      const roomInfo = JSON.parse(localStorage.getItem('currentRoom'));
      if (roomInfo) {
        setUserInfo(roomInfo); // 저장된 방 정보를 userInfo 배열에 설정
      }
      
      //const RoomInfo = JSON.parse(localStorage.getItem("currentRoom"));
  
      
      // 여기에서 RoomInfo의 값을 상태로 설정
      // if (RoomInfo) {
      //   setRoomName(RoomInfo.name);
      //   setTitle(RoomInfo.title);
      //   const startDate = new Date(RoomInfo.startDate);
      //   startDate.setDate(startDate.getDate() + 1);
      //   const endDate = new Date(RoomInfo.endDate);
      //   endDate.setDate(endDate.getDate() + 1);
      //   setStartDate(startDate.toISOString().split('T')[0]);
      //   setEndDate(endDate.toISOString().split('T')[0]);
      // } else {
      //   setNoRoom(true); // Set noRoom to true when currentRoom data is absent
      // }

    }, []);

    return (
      <div>
        <Header />
        <div className="ScheduledContainer">
          <div className="NameMeetingContainer">
            <p className="NameMeeting">{name}'s meetings</p>
          </div>
          {userInfo.length === 0 ? (
          <div className="NoRoomMessage">
            <p>현재 참가 중인 방이 없습니다.</p>
          </div>
          ) : (
            //<Link to="/CalendarPage">
            userInfo.map((room, index) => (
            <Link to={`/CalendarPage?roomName=${room.name}&startDate=${room.startDate}&endDate=${room.endDate}`} key={index}>
              <button>
                <div className="RoomInfo">
                  <div className="headerTextStyleContainer">
                    <p className="headerTextStyle">Not Scheduled</p>
                  </div>
                  <div className="infoContainer">
                    <p>{room.name}</p>
                    <p>{room.title}</p>
                    <p>{room.startDate.split('T')[0]} ~ {room.endDate.split('T')[0]}</p>
                    {
                    /* <p>{RoomName}</p>
                    <p>{title}</p>
                    <p>{startDate} ~ {endDate}</p> */}
                  </div>
                </div>
              </button>
            </Link>
            ))
          )}
        </div>
        <Footer />
      </div>
    );
  }
  

  
export default MyInfo;