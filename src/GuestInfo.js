import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './GuestInfo.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { db } from "./firebase";
import { collection, addDoc, getDocs } from 'firebase/firestore';

class TreeNode {
    constructor(id, password, date) {
        this.id = id;
        this.password = password;
        this.date = date;
    }
}

class Tree {
    constructor() {
        this.head = null;
    }
}

function addNodeInRange(tree, id, password, date) {
    const currentDate = new Date(date*1000);
    currentDate.setDate(currentDate.getDate()+ 2);
    
    var newNode = new TreeNode(id, password, new Date(currentDate).toJSON());
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

function GuestInfo() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dates, setDates] = useState([null]); // 초기값을 null로 설정

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    // '+' 버튼 클릭 시 추가적인 날짜 범위 입력 상자 생성
    const addDate = () => {
        setDates([...dates, null]);
    };

    // handleDateChange 함수에서 date가 null일 때 예외 처리
    const handleDateChange = (date, index) => {
        const newDates = [...dates];
        newDates[index] = date;
        setDates(newDates);
    };

    // handleSubmit 함수는 완료 버튼을 클릭할 때 실행
    const handleSubmit = () => {
        const tree = new Tree();
        const storedUser = JSON.parse(localStorage.getItem("recentUser"));

        console.log("최근 유저 :", storedUser);
        const fetchData = async () => {
            console.log(tree.head);
              const querySnapshot = await getDocs(collection(db, 'User'));
              querySnapshot.forEach((doc) => {
                addNodeInRange(tree, doc.data().id, doc.data().password, doc.data().date);
              });
            console.log(tree.head);
          };
          
          
        
        for (const date of  dates){
            const firestoreUserData = {
                id : storedUser.id,
                password : storedUser.password,
                date : date
            };
            addDoc(collection(db, "User"), firestoreUserData);
        }
            fetchData();
            setName('');
            setEmail('');
            setPhoneNumber('');
            setDates([null]);
    };

    return (
        <div>
            <Header />
            <div className="content container">
                <div className="input-box-container">
                    <input
                        type="text"
                        className="form-control input-box"
                        placeholder="이름 입력"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <input
                        type="email"
                        className="form-control input-box"
                        placeholder="이메일 입력"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input
                        type="tel"
                        className="form-control input-box"
                        placeholder="전화번호 입력"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                    <label className="date-label">참여 가능한 날짜를 선택해주세요</label>
                    <div className="date-range-container">
                        {dates.map((date, index) => (
                            <div key={index} className="date-range">
                                <DatePicker
                                    placeholderText="날짜 선택"
                                    selected={date}
                                    onChange={(date) => handleDateChange(date, index)}
                                    dateFormat="yyyy-MM-dd"
                                    className="date-picker"
                                />
                            </div>
                        ))}
                    </div>
                    <button className="add-date-button" onClick={addDate}>
                        +
                    </button>
                    <Link to="/List">
                        <button className="btn btn-success submit-btn" onClick={handleSubmit}>
                            완료
                        </button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default GuestInfo;