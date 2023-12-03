import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';
import moment, { locale } from 'moment';
import { collection, addDoc, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
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
function CalendarPage() {
    const [participants] = useState(['Participant 1', 'Participant 2', 'Participant 3']);
    const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState(new Date());
    const [dataDates, setDataDates] = useState([]); // 데이터가 있는 일자 목록

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };
    console.log(date);
    const tree = new Tree();
    //console.log("날짜 : ", date);
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    //const storedUser = JSON.parse(localStorage.getItem("room"));
    console.log('storedUser : ', storedUser);
    const storedValue = localStorage.getItem('currentRoom');
    const parsedValue = JSON.parse(storedValue);
    const fetchData = async () => {
        //console.log(tree.head);
        const querySnapshot = await getDocs(collection(db, 'DateInfo'));
        console.log('-- currentRoom.name: ', parsedValue.name);
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
        });
        console.log(tree.head);
        const sortedRoot = insertionSortLCRSTree(tree.head);
        console.log('정렬된 트리: ', sortedRoot);
    };

    fetchData();
    localStorage.setItem('currentdate', JSON.stringify(date));

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
                    <button className="btn btn-success submit-btn" onClick={handleOpenPopup}>
                        일정 넣기
                    </button>
                </div>
                <div className="participants-container">
                    <Link to="/GuestInfo">
                        <button className="btn btn-success submit-btn me-3">참가하기</button>
                    </Link>
                    <button className="btn btn-success submit-btn" onClick={handleShare}>
                        공유하기
                    </button>

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

export default CalendarPage;
