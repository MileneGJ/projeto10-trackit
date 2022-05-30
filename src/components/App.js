import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserContext from "../contexts/UserContext";
import HabitContext from '../contexts/HabitContext';
import LoginPage from './LoginPage';
import SingUpPage from './SignUpPage';
import HabitsPage from './HabitsPage';
import TodayPage from './TodayPage';
import HistoryPage from './HistoryPage';

export default function App() {
    let [userData,setUserData] = useState({});
    let [currentHabits, setCurrentHabits] = useState([]);
    return (
        <UserContext.Provider value={{userData,setUserData}}>
            <HabitContext.Provider value={{currentHabits, setCurrentHabits}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/cadastro" element={<SingUpPage />} />
                    <Route path="/habitos" element={<HabitsPage />} />
                    <Route path="/hoje" element={<TodayPage />} />
                    <Route path="/historico" element={<HistoryPage />} />
                </Routes>
            </BrowserRouter>
            </HabitContext.Provider>
        </UserContext.Provider>
    )
}