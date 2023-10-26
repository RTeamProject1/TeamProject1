
//지민님 코드

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import './GuestInfo.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

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

class Tree{
    constructor(){
        this.head = null;
    }

    addNodeInRange(name, email, phoneNumber, startDate, endDate) {
        const currentDate = new Date(startDate);
        const endDateObj = new Date(endDate);

        while (currentDate <= endDateObj) {
            const newNode = new TreeNode(name, email, phoneNumber, new Date(currentDate));

            if (!this.head) {
                this.head = newNode;
            } else {
                let current = this.head;
                let parent = null;

                while (current) {
                    // 날짜 비교를 통해 형제 노드 또는 자식 노드로 추가
                    if (current.date < newNode.date) {
                        if (!current.children){
                            current.children = newNode;
                            break;
                        }else {
                            parent = current;
                            current = current.children;
                        }
                    } else if (current.date > newNode.date) {
                        //newNode.sibling = current;
                        if (parent) {
                            newNode.children = parent.children;
                            parent.children = newNode;
                        } else {
                            newNode.children = this.head;
                            this.head = newNode;
                        }
                        break;
                    } else {
                        // 날짜가 같은 경우, 형제 노드로 추가
                        newNode.sibling = current.sibling;
                        current.sibling = newNode;
                        break;
                    }
                }

                // 부모 노드의 자식으로 추가
                /*if (parent) {
                    if (!parent.children) {
                        parent.children = newNode;
                    } else {
                        let child = parent.children;
                        while (child.sibling) {
                            child = child.sibling;
                        }
                        child.sibling = newNode;
                    }
                }*/
            }

            currentDate.setDate(currentDate.getDate() + 1); // 다음 날짜로 이동
        }
    }
}


function GuestInfo() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

   


    // handleSubmit 함수는 완료 버튼을 클릭할 때 실행
    const handleSubmit = () => {
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        //const tree = userData.tree;
        
        if (!userData.tree) {
            userData.tree = new Tree();
        }
        userData.tree.addNodeInRange(name, email, phoneNumber, startDate, endDate);
        

        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData.tree);
        // 데이터를 저장한 후 필요에 따라 다른 작업 수행 가능
        //localStorage.clear();
        setName('');
        setEmail('');
        setPhoneNumber('');
        setStartDate(null);
        setEndDate(null);
    }

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
                    type="tel"
                    className="form-control input-box"
                    placeholder="전화번호 입력"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
                <label>참여 가능한 기간을 입력해주세요</label>
                <div className="date-range">
                    <DatePicker
                        placeholderText="언제부터"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <DatePicker
                        placeholderText="언제까지"
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
                <Link to="/List">
                    <button className="btn btn-success submit-btn" onClick={handleSubmit}>
                        완료
                    </button>
                </Link>
            </div>
            <Footer />
        </div>
    );
}

export default GuestInfo;


/*import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import './GuestInfo.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function GuestInfo() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // handleSubmit 함수는 완료 버튼을 클릭할 때 실행되고, 선택한 날짜를 사용하여 LCRS 트리 노드를 만들고, 사용자가 입력한 정보와 함께 로컬 스토리지에 저장
    const handleSubmit = () => {
        const newNode = {
            // startDate과 endDate는 날짜 객체이기 때문에 .toIOString() 메서드로 문자열로 변환해줘야 함 
            // -> 안해주면 List.js에서 날짜를 못받아서 date과 비교를 할 수 없음
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            // 없어도 된다.
            children: null, 
        };

        // 새로운 유저 데이터가 기존 데이터와 함께 저장되게 만드는 코드
        const existingData = JSON.parse(localStorage.getItem('userData')) || [];
        existingData.push({
            name,
            email,
            phoneNumber,
            // 사용자의 선택한 날짜 범위와 관련된 데이터, startDate과 endDate를 포함한 트리 노드 객체가 여기에 포함
            treeData: newNode,
        });
        localStorage.setItem('userData', JSON.stringify(existingData));
    };

    useEffect(() => {
        // 로컬 스토리지에 저장되있는 userData를 콘솔에 출력
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log('Data from localStorage:', userData);
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
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    className="form-control input-box"
                    placeholder="이메일 입력"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="tel"
                    className="form-control input-box"
                    placeholder="전화번호 입력"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label>참여 가능한 기간을 입력해주세요</label>
                <div className="date-range">
                    <DatePicker
                        placeholderText="언제부터"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <DatePicker
                        placeholderText="언제까지"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
                <Link to="/List">
                    <button className="btn btn-success submit-btn" onClick={handleSubmit}>
                        완료
                    </button>
                </Link>
            </div>
            <Footer />
        </div>
    );
}
export default GuestInfo;

*/