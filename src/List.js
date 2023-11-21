import React, { useState, useEffect, usesort } from 'react';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import Footer from './Footer';
import 'react-calendar/dist/Calendar.css';
import './List.css';
import moment from "moment";
import { db } from "./firebase";
import { collection, getDocs, query, where } from 'firebase/firestore';

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
                phoneNumber: current.phoneNumber,
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

//insertion sort를 위한 함수 두개
function countSibling(node) {
    let a = 0;

    while (node) {
        a++;
        node = node.sibling;
    }

    return a;
}

class TreeNode {
    constructor(name, email, phoneNumber, date) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.date = date;
        this.children = null;
        this.sibling = null;
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

//주석 처리 된 부분은 insertion sort관련 코드
function List() {
    const [date, setDate] = useState(new Date());
    const [participants, setParticipants] = useState([]);
    const [possibleDates, setPossibleDates] = useState([]);

   /* useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, "User"), where("dates", "array-contains", date));
            const querySnapshot = await getDocs(q);
            const voters = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                voters.push({
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                });
            });
            console.log("Fetched Data:", voters);
            // 이 부분에서 voters 배열을 filteredParticipants 배열로 설정
            setParticipants(voters.map(voter => voter.name));
        };

        fetchData();
    }, [date]);


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData')) || [];
        console.log(db);
        const sortedRoot = insertionSortLCRSTree(userData.tree.head);

        let currentNode = sortedRoot;
        while (currentNode) {
            const date = currentNode.date.split('T')[0];
            possibleDates.push(date);
            currentNode = currentNode.children;
        }

        setPossibleDates(possibleDates);
    }, []);*/

    return (
        <div>
            <Header />
            <div className="container">
                <div className="calendar-container">
                    <Calendar className="calendar" onChange={setDate} value={date} 
                    formatDay={(locale, date) => moment(date).format("DD")}
                    calendarType={"US"} />
                </div>

                <div className="List-container">
                    <h1>가능한 날짜 순위</h1>

                    {possibleDates.slice(0, 3).map((date, dateIndex) => (
                        <li key={dateIndex}>
                            {dateIndex + 1}. {date}
                        </li>
                    ))}
                </div>

                <div className="participants-container">
                    <h2>참여자 목록</h2>
                    {participants.map((participants, index) => (
                        <p key={index}>{participants}</p>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default List;