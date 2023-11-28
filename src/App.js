import './App.css';
import Landing from './Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import CreateRoom2 from './CreateRoom2';
import CalendarPage from './CalendarPage';
import GuestInfo from './GuestInfo';
import List from './List';
import Time from './Time';
import Login from './Login';
import MyInfo from './MyInfo';
import SignUp from './SignUp';
import { db } from './firebase';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />}></Route>
                    <Route path="/CreateRoom" element={<CreateRoom />}></Route>
                    <Route path="/CreateRoom2" element={<CreateRoom2 />}></Route>
                    <Route path="/CalendarPage" element={<CalendarPage />}></Route>
                    <Route path="/Time" element={<Time />}></Route>
                    <Route path="/GuestInfo" element={<GuestInfo />}></Route>
                    <Route path="/List" element={<List />}></Route>
                    <Route path="/MyInfo" element={<MyInfo />}></Route>
                    <Route path="/Login" element={<Login />}></Route>
                    <Route path="/SignUp" element={<SignUp />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
