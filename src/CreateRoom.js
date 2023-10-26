import React, { useState } from 'react';
import './CreateRoom.css';
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function CreateRoom() {
    const [head, setHead] = useState(null); // head 상태 변수 추가
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    // 데이터 유효성 검사 함수
    const validateData = () => {
        return name.trim() !== '' && email.trim() !== '' && phoneNumber.trim() !== '';
    };

    const addData = () => {
        if (validateData()) {
            // Node 클래스 정의
            class Node {
                constructor(name, email, phoneNumber) {
                    this.name = name;
                    this.email = email;
                    this.phoneNumber = phoneNumber; // 휴대폰 번호 추가
                    this.next = null;
                }
            }

            const newNode = new Node(name, email, phoneNumber);
            newNode.next = head;
            setHead(newNode);
            setName('');
            setEmail('');
            setPhoneNumber('');

            const storedData = JSON.parse(localStorage.getItem('roomData')) || [];
            storedData.unshift({ name: name, email: email, phoneNumber: phoneNumber });
            localStorage.setItem('roomData', JSON.stringify(storedData));
        }
    };

    const handleComplete = () => {
        addData();
        navigate('/CreateRoom2');
    };

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('roomData')) || [];
        console.log('Saved Data in CreateRoom:');
        storedData.forEach((item, index) => {
            console.log(`Entry ${index + 1}: 이름 - ${item.name}, 이메일 - ${item.email}, 휴대폰 번호 - ${item.phoneNumber}`);
        });
    }, []);

    return (
        <div>
            <Header />
            <div className="content container">
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
                    type="tel" // 휴대폰 번호 입력 필드
                    className="form-control input-box"
                    placeholder="전화번호 입력"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
                <button className="btn btn-success submit-btn" onClick={handleComplete}>
                    완료
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default CreateRoom;