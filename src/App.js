import './App.css';
import Landing from './Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import CreateRoom2 from './CreateRoom2';
import CalendarPage from './CalendarPage';
import GuestInfo from './GuestInfo';
import List from './List';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />}></Route>
                    <Route path="/CreateRoom" element={<CreateRoom />}></Route>
                    <Route path="/CreateRoom2" element={<CreateRoom2 />}></Route>
                    <Route path="/CalanderPage" element={<CalendarPage />}></Route>
                    <Route path="/GuestInfo" element={<GuestInfo />}></Route>
                    <Route path="/List" element={<List/>}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
