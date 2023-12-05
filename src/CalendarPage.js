import React, { useState, useEffect, usesort } from 'react';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import Footer from './Footer';
//import { Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';
import moment, { locale } from 'moment';
import { collection, query, where, addDoc, getDocs, connectFirestoreEmulator,deleteDoc} from 'firebase/firestore';
import { db } from './firebase';
class Tree {
    constructor() {
        this.head = null;
    }
}
class TreeNode {
    constructor(RoomName, userName, userEmail, date, times) {
        this.RoomName = RoomName;
        this.userName = userName;
        this.userEmail = userEmail;
        this.date = date;
        this.times = times;
    }
}
function countSibling(node) {
    let a = 0;

    while (node) {
        a++;
        node = node.sibling;
    }

    return a;
}
function addNodeInRange(tree, RoomName, userName, userEmail, date, times) {
    const currentDate = new Date(date * 1000);
    currentDate.setFullYear(currentDate.getFullYear() - 1969);
    currentDate.setDate(currentDate.getDate() + 2);

    var newNode = new TreeNode(RoomName, userName, userEmail, new Date(currentDate).toJSON(), times);
    if (!tree.head) {
        tree.head = newNode;
    } else {
        let current = tree.head;
        let parent = null;

        while (current) {
            // 날짜 비교를 통해 형제 노드 또는 자식 노드로 추가
            if (current.date < newNode.date) {
                if (!current.children) {
                    current.children = newNode;
                    break;
                } else {
                    parent = current;
                    current = current.children;
                }
            } else if (current.date > newNode.date) {
                if (parent) {
                    newNode.children = parent.children;
                    parent.children = newNode;
                } else {
                    newNode.children = tree.head;
                    tree.head = newNode;
                }
                break;
            } else {
                // 날짜가 같은 경우, 형제 노드로 추가
                newNode.sibling = current.sibling;
                current.sibling = newNode;
                break;
            }
        }
    }
}
function insertionSortLCRSTree(root) {
    if (!root) {
        return null;
    }

    const sortedRoot = new TreeNode(0); // 더미 노드
    let unsortedRoot = root;

    while (unsortedRoot) {
        const current = unsortedRoot;
        unsortedRoot = unsortedRoot.children;

        let prev = null;
        let sorted = sortedRoot.children;

        while (sorted && countSibling(current) <= countSibling(sorted)) {
            prev = sorted;
            sorted = sorted.children;
        }

        if (!prev) {
            // 현재 노드를 정렬된 트리의 가장 앞에 삽입합니다.
            current.children = sortedRoot.children;
            sortedRoot.children = current;
        } else {
            // 이전 노드와 현재 노드 사이에 현재 노드를 삽입합니다.
            prev.children = current;
            current.children = sorted;
        }
    }

    return sortedRoot.children;
}

function search(node, targetDate) {
    if (!node) {
        return null;
    }

    // 현재 노드의 날짜를 JSON 문자열로 변환하여 대상 날짜와 비교
    if (new Date(node.date).toJSON() === new Date(targetDate).toJSON()) {
        return node;
    }

    // 현재 노드의 날짜가 대상 날짜보다 더 뒤에 있는 경우
    if (new Date(node.date) > new Date(targetDate)) {
        return null;
    }

    // 자식 노드에 대해 재귀적으로 탐색
    return search(node.children, targetDate);
}
function findVotersForDate(tree, targetDate) {
    const inputDate = new Date(targetDate);
    inputDate.setDate( inputDate.getDate() + 1);
    const formattedDateString = inputDate.toISOString();
    //console.log(formattedDateString);
    // 트리의 루트부터 탐색 시작
    return search(tree, formattedDateString);
}



function CalendarPage() {
    //const [participants] = useState(['Participant 1', 'Participant 2', 'Participant 3']);
    const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState([]);
    const [dataDates, setDataDates] = useState([]); // 데이터가 있는 일자 목록
    const [participants, setParticipants] = useState([]);
    const [possibleDates, setPossibleDates] = useState([]);
    const [possibleTimes, setPossibleTimess] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        //const storedUser = JSON.parse(localStorage.getItem("room"));
    console.log(date);
        const storedValue = localStorage.getItem('currentRoom');
        const parsedValue = JSON.parse(storedValue);
    const handleDateClick = (date) => {
        setSelectedDate(date);
    };
    const deleteData = async (date) => {
        try {
            const nextDayDate = new Date(date);
            nextDayDate.setDate(date.getDate() + 1);

            // Date 객체를 ISO 형식(2023-12-06T00:00:00.000Z)으로 변환
            const isoFormattedDate = nextDayDate.toISOString();
            

          // Firebase에서 해당 일정 데이터 삭제
          //await deleteDoc(doc(db, "DateInfo", date.toISOString()));
          console.log("일정이 삭제되었습니다.");
          // 삭제된 데이터를 화면에서 반영하기 위해 상태 업데이트
          //setDataDates((prevDataDates) => prevDataDates.filter((dataDate) => !moment(dataDate).isSame(date, "day")));


            const querySnapshot = await getDocs(collection(db, 'DateInfo'));
            querySnapshot.forEach(async (doc) =>{
                const currentDate = new Date(doc.data().date * 1000);
                currentDate.setFullYear(currentDate.getFullYear() - 1969);
                currentDate.setDate(currentDate.getDate() + 2);

                const firestoreDate = new Date(currentDate).toJSON();
                console.log(firestoreDate);
                console.log(isoFormattedDate);
                console.log(storedUser.displayName);
                console.log(doc.data().name);
                if (firestoreDate === isoFormattedDate && storedUser.displayName === doc.data().name){
                    
                    await deleteDoc(doc.ref);
                }
            });
        } catch (error) {
          console.error("일정 삭제 중 오류가 발생했습니다:", error);
        }
      };

      const handleModify = () => {
        // 데이터 삭제 함수 호출
        deleteData(selectedDate);
    };  
    //console.log(date);

    //console.log("날짜 : ", date);
    

    useEffect(() => {
        let fetchData = async () => {
            const newDates = [];
            const tree = new Tree();
            //console.log(tree.head);
            const querySnapshot = await getDocs(collection(db, 'DateInfo'));
            //console.log('-- currentRoom.name: ', parsedValue.name);
            
            querySnapshot.forEach((doc) => {
                if (parsedValue.name === doc.data().RoomName) {
                    addNodeInRange(
                        tree,
                        doc.data().RoomName,
                        doc.data().name,
                        doc.data().email,
                        doc.data().date,
                        doc.data().times
                    );
                }
                if (parsedValue.name === doc.data().RoomName && storedUser.displayName === doc.data().name){
                    const currentDate = new Date(doc.data().date * 1000);
                    currentDate.setFullYear(currentDate.getFullYear() - 1969);
                    currentDate.setDate(currentDate.getDate() + 1);

                    let newDate = new Date(currentDate).toJSON();
                    newDates.push(newDate);
                }
            });

            setDataDates(newDates);
            console.log(tree.head);
            const sortedRoot = insertionSortLCRSTree(tree.head);
            console.log('정렬된 트리: ', sortedRoot);
            
            //setPossibleDates([]);
            let currentNode = sortedRoot;
            let newPossibleDates = [];
            while (currentNode) {
                const date = currentNode.date.split('T')[0];
                newPossibleDates.push(date);
                currentNode = currentNode.children;
            }
            setPossibleDates(newPossibleDates);
            console.log(newPossibleDates);
            

            const person1 = findVotersForDate(tree.head, date);
                let node = person1;
                let newParticipants = [];

                while (node) {
                    newParticipants.push(node.userName);
                    node = node.sibling;
                }

                console.log("참여자 목록 :", newParticipants);
                setParticipants(newParticipants);

            };

            fetchData();

    localStorage.setItem('currentdate', JSON.stringify(date));
}, [date]);
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
                        tileClassName={({ date, view }) => (view === 'month' && isDataDate(date) ? 'has-data' : '')}
                    />
                    <button className="custom-button" onClick={handleOpenPopup}>
                        일정 추가하기
                    </button>
                    <button className="custom-button1" onClick={handleModify}>
                        일정 삭제
                    </button>
                    
                </div>
                <div className="List-container">
                    <h1>가능한 날짜</h1>
                    {possibleDates.slice(0, 3).map((date, dateIndex) => (
                        <li key={dateIndex}>
                            {dateIndex + 1}. {date}
                        </li>
                    ))}
                </div>  
                
                <div className="participants-container">
                    {/*<Link to="/GuestInfo">
                        <button className="btn btn-success submit-btn me-3">참가하기</button>
                    </Link>
                    <button className="btn btn-success submit-btn" onClick={handleShare}>
                        공유하기
                    </button>

                    <h2>참여자 목록</h2>
                    {participants.map((participant, index) => (
                        <p key={index}>{participant}</p>
                    ))}*/}
                    <h2>참여자</h2>
                    {participants.map((participant, index) => (
                        <p key={index}>{participant}</p>
                    ))}
                    <button className="btn btn-success submit-btn" onClick={handleShare}>
                        공유하기
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CalendarPage;
