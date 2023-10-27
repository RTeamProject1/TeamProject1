import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import Footer from './Footer';
import 'react-calendar/dist/Calendar.css';
import './List.css';

// 코드 흐름
// 1.캘린더에 날짜가 선택되면 
// 2. 'Calendar' 컴포넌트에서 onChange={setDate} 실행 -> 현재 선택된 날짜 상태(data)를 업데이트
// 3. useEffect에서 locatStorage에 저장된 데이터를 userData 배열에 저장
// 4. userData 배열에서 유저 정보 필터링(현재 선택한 날짜와 각 유저의 시작 날짜, 종료 날짜를 비교하고 참여 가능한 유저 필터링)
//    이 필터링 된 결과를 filteredParticipants 배열에 저장
// 5. filteredParticipants 배열에서 각 유저의 이름만 추출하고 이것을 participantNames 배열에 저장
// 6. setParticipants(participantNames)를 호출해서 참여자 목록 업데이트

function search(node, targetDate, voters) {
    if (!node) {
        return;
    }

    // 현재 노드의 날짜를 JSON 문자열로 변환하여 대상 날짜와 비교
    if (new Date(node.date).toJSON() === new Date(targetDate).toJSON()) {
        let current = node;
        while (current) {
            voters.push({
                name: current.name,
                email: current.email,
                phoneNumber: current.phoneNumber
            });
            current = current.sibling;
        }
        return;
    }

    // 현재 노드의 날짜가 대상 날짜보다 더 뒤에 있는 경우
    if (new Date(node.date) > new Date(targetDate)) {
        return;
    }

    search(node.children, targetDate, voters);
}
function findVotersForDate(tree, targetDate) {
    const voters = [];

    // 트리의 루트부터 탐색 시작
    search(tree.head, targetDate, voters);

    return voters;
}






function CalendarPage() {
    const [date, setDate] = useState(new Date());
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        // 로컬 스토리지에서 가져온 데이터를 JavaScript 객체로 변환한 후 userData 배열에 저장
        const userData = JSON.parse(localStorage.getItem('userData')) || [];

        const selectedDate = new Date(date); // 선택한 날짜를 복사
        selectedDate.setDate(selectedDate.getDate() + 1); // 하루 뒤 날짜로 변경
        // const selectedDateISO = selectedDate.toISOString().split('T')[0];
        // const selectedDateISO = selectedDate.toJSON().split('T')[0];

        const selectedDateJSON = selectedDate.toJSON();
        // 날짜에 해당하는 사용자 정보를 찾고 투표자 목록 추출
        const voters = findVotersForDate(userData.tree, selectedDateJSON);

        // 추출한 투표자 목록을 이름으로 변환
        const votedParticipants = voters.map((voter) => voter.name);

        setParticipants(votedParticipants);
        
        
        console.log("Selected Date:", selectedDate);
        console.log("Voters: ",voters );
    }, [date]);

    return (
        <>
            <Header />
            <div className="container">
                <div className="calendar-container">
                    <Calendar
                        className="calendar"
                        onChange={setDate}
                        value={date}
                    />
                </div>

                <div className="List-container">
                    <h1>가능한 날짜 순위</h1>
                </div>

                <div className="participants-container">
                    <h2>참여자 목록</h2>
                    {participants.map((participants, index) => (
                        <p key={index}>{participants}</p>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CalendarPage;




/*import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import Footer from './Footer';
import 'react-calendar/dist/Calendar.css';
import './List.css';

// 코드 흐름
// 1.캘린더에 날짜가 선택되면 
// 2. 'Calendar' 컴포넌트에서 onChange={setDate} 실행 -> 현재 선택된 날짜 상태(data)를 업데이트
// 3. useEffect에서 locatStorage에 저장된 데이터를 userData 배열에 저장
// 4. userData 배열에서 유저 정보 필터링(현재 선택한 날짜와 각 유저의 시작 날짜, 종료 날짜를 비교하고 참여 가능한 유저 필터링)
//    이 필터링 된 결과를 filteredParticipants 배열에 저장
// 5. filteredParticipants 배열에서 각 유저의 이름만 추출하고 이것을 participantNames 배열에 저장
// 6. setParticipants(participantNames)를 호출해서 참여자 목록 업데이트

function CalendarPage() {
    const [date, setDate] = useState(new Date()); // 현재 선택된 날짜를 관리하는 변수
    const [participants, setParticipants] = useState([]); // 선택된 날짜에 참여할 수 있는 사용자의 이름 목록을 저장하는 변수

    useEffect(() => {
        // 로컬 스토리지에서 가져온 데이터를 JavaScript 객체로 변환한 후 userData 배열에 저장
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log('Data from localStorage in CalendarPage:', userData);

        // userData 배열에서 사용자 정보를 필터링하는 과정
        // 현재 선택한 날짜(date)와 유저의 시작 날짜, 종료 날짜 비교
        // 참여 가능한 날짜 범위 내에 있는 사용자들만 필터링해서 filteredParticipants 배열에 저장
        const filteredParticipants = userData.filter((user) => {
            const userStartDate = new Date(user.treeData.startDate);
            const userEndDate = new Date(user.treeData.endDate);
            
            // .filter()함수에서 유저 데이터를 필터링하는 조건
            return userStartDate <= date && date <= userEndDate;
        });

        // 각 사용자 객체에서 이름만 추출
        // 이렇게 추출한 이름들로 만들어진 새로운 배열 participantNames을 만든다.
        // 즉, participantNames 배열에는 현재 선택한 날짜(date)에 참여 가능한 유저들의 이름만 포함됨
        const participantNames = filteredParticipants.map((participant) => participant.name);
        console.log(participantNames)
        setParticipants(participantNames);
    }, [date]);

    return (
        <>
            <Header />
            <div className="container">
                <div className="calendar-container">
                    <Calendar
                        className="calendar"
                        onChange={setDate}
                        value={date}
                    />
                </div>

                <div className="List-container">
                    <h1>가능한 날짜 순위</h1>
                </div>

                <div className="participants-container">
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

export default CalendarPage;*/