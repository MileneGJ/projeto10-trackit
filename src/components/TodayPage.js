import styled from 'styled-components';
import { useContext,useState,useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

export default function TodayPage() {
    const { userData } = useContext(UserContext);
    const dayjs = require('dayjs');
    let now = dayjs();
    const [currentHabits,setCurrentHabits] = useState([])

    useEffect(()=>{
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}` 
            }
        }        
        const promise = axios.get(URL,config);
        promise.then(response => setCurrentHabits(response.data));
    },[])

    function Habit(title, sequence, record) {
        return (
            <HabitCard>
                <div>
                    <h3>{title}</h3>
                    <p>Sequência atual: {sequence} dias</p>
                    <p>Seu recorde: {record} dias</p>
                </div>
                <div>
                    <ion-icon name="checkmark"></ion-icon>
                </div>
            </HabitCard>
        )
    }

    function translateWeekday(day) {
        switch (day) {
            case "Monday":
                return "Segunda";
            case "Tuesday":
                return "Terça";
            case "Wednesday":
                return "Quarta";
            case "Thursday":
                return "Quinta";
            case "Friday":
                return "Sexta";
            case "Saturday":
                return "Sábado";
            case "Sunday":
                return "Domingo";
            default:
                return "";
        }
    }

    return (
        <>
            <Header />
            <Content>
                <h2>{`${translateWeekday(now.format('dddd'))}, ${now.format('DD/MM')}`}</h2>
                <p>Nenhum hábito concluído ainda</p>

                <HabitsList>
                    {currentHabits.length > 0 ? currentHabits.map(habit => <Habit key={habit.id} title={habit.name}/>) : null}
                </HabitsList>

                <Footer />
            </Content>
        </>
    )
}


const Content = styled.div`
width:100%;
height:1000px;
display:flex;
flex-direction:column;
padding: 100px 20px 100px 20px;
background-color:#E5E5E5;

h2{
    color: #126BA5;
    font-size: 24px;
    margin-bottom:10px;
}
p{
    color:#BABABA;
    font-size:18px;
}
`

const HabitsList = styled.div`
width:100%;
display:flex;
flex-direction:column;
`
const HabitCard = styled.div`
width:100%;
height:94px;
display:flex;
justify-content:space-between;
padding: 15px;
background-color:#FFFFFF;
border-radius:5px;

`

