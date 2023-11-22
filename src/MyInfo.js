import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './MyInfo.css';

function MyInfo() {
    return (
      <div>
        <Header />
        <div className="ScheduledContainer">
            <div className="NameMeetingContainer">
                <p className="NameMeeting">Name's meetings</p>
            </div>
          <Link to="/CalendarPage">
            <button>
              <div className="RoomInfo">
                <div className="headterTextStyleContainer">
                  <p className="headterTextStyle">Not Scheduled</p>
                </div>
                <div className="infoContainer">
                  <p>name</p>
                  <p>title</p>
                  <p>period</p>
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