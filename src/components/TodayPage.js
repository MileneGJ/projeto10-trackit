import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import ProgressContext from '../contexts/ProgressContext';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

export default function TodayPage() {
    const [currentHabits, setCurrentHabits] = useState([]);
    const { setProgress } = useContext(ProgressContext);
    const token = localStorage.getItem("token");
    const dayjs = require('dayjs');
    let now = dayjs();

    useEffect(() => {
        updateHabitsList();
    }, [])

    function updateHabitsList() {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(URL, config);
        promise.then(response => {
            setCurrentHabits(response.data);
            let concluded = response.data.filter(habit => habit.done)
            setProgress((concluded.length / response.data.length) * 100);
        });
    }

    function Habit({ title, index, HID, sequence, record, done }) {
        let habitDone = "n";
        let equal = "n";
        if (sequence === record) {
            equal = "y";
        }
        if (done === true) {
            habitDone = "y";
        }
        let updatedConcludedHabits = currentHabits.filter(h => h.done).map(h => h.id)
        for (let i = 0; i < updatedConcludedHabits.length; i++) {
            if (index === updatedConcludedHabits[i]) {
                habitDone = "y";
            }
        }

        return (
            <HabitCard done={habitDone} equal={equal}>
                <div>
                    <h3>{title}</h3>
                    <span><p>Sequência atual: </p><p> {sequence} dias</p></span>
                    <span><p>Seu recorde: </p><p> {record} dias</p></span>
                </div>
                <div onClick={() => markAsDone(HID)}>
                    <ion-icon name="checkmark"></ion-icon>
                </div>
            </HabitCard>
        )
    }

    function markAsDone(HID) {
        let habitDone = "n";
        let URL;
        let updatedConcludedHabits = currentHabits.filter(habit => habit.done).map(habit => habit.id)
        for (let i = 0; i < updatedConcludedHabits.length; i++) {
            if (HID === updatedConcludedHabits[i]) {
                habitDone = "y";
            }
        }

        if (habitDone === "n") {
            updatedConcludedHabits = [...updatedConcludedHabits, HID];
            URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${HID}/check`;
        } else if (habitDone === "y") {
            updatedConcludedHabits = updatedConcludedHabits.filter(x => x !== HID);
            URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${HID}/uncheck`;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.post(URL, {}, config);
        promise.then(() => {
            updateHabitsList()
        }
        );
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
            <Content qtdDoneHabits={currentHabits.filter(h => h.done).length}>
                <h2>{`${translateWeekday(now.format('dddd'))}, ${now.format('DD/MM')}`}</h2>
                <h3>{currentHabits.filter(h => h.done).length > 0 ? `${100 * (currentHabits.filter(h => h.done).length / currentHabits.length).toFixed(2)}% dos hábitos concluídos` : "Nenhum hábito concluído ainda"}</h3>

                <HabitsList>
                    {currentHabits.length > 0 ? currentHabits.map(habit =>
                        <Habit key={habit.id}
                            HID={habit.id}
                            title={habit.name}
                            sequence={habit.currentSequence}
                            record={habit.highestSequence}
                            done={habit.done} />) : null}
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
box-sizing:border-box;

h2{
    color: #126BA5;
    font-size: 24px;
    margin-bottom:10px;
}
h3{
    color:${(props) => props.qtdDoneHabits > 0 ? "#8FC549" : "#BABABA"};
    font-size:18px;
    margin-bottom:30px;
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
box-sizing:border-box;
margin:10px 0;

h3{
    font-size:20px;
    color:#666666;
    margin-bottom:10px;
}
span{
    display:flex;
}
p{
    font-size:14px;
    line-height:18px;
    color:#666666;
    margin-right:3px;
}

div:last-child{
    width:70px;
    height:70px;
    background-color:${({ done }) => done === "y" ? "#8FC549" : "#EBEBEB"};
    border-radius:5px;
    display:flex;
    justify-content:center;
    align-items:center;
}

ion-icon{
    color:#FFFFFF;
    font-size:50px;
    --ionicon-stroke-width: 70px;
}

span:first-child>p:last-child{
    color:${({ done }) => done === "y" ? "#8FC549" : "#666666"}
}

span:last-child>p:last-child{
    color:${(props) => props.done === "y" && props.equal === "y" ? "#8FC549" : "#666666"}
}
`

