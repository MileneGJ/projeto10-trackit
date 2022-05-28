import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

export default function HabitsPage() {
    const { userData } = useContext(UserContext);
    const [activateCreate, setActivateCreate] = useState("n");
    const [newHabit, setNewHabit] = useState({});
    const [currentHabits, setCurrentHabits] = useState([]);

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        const promise = axios.get(URL, config);
        promise.then(response => setCurrentHabits(response.data))
    }, [])

    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"]

    function CreateHabit({ active }) {
        if (active === "n") {
            return <></>
        } else {
            return (
                <CreationCard>
                    <input type="text" placeholder='nome do hábito' value={newHabit.name} onChange={e => setNewHabit({ ...newHabit, name: e.target.value })} />
                    <div>{weekdays.map(day => <span>{day}</span>)}</div>
                    <div>
                        <button onClick={() => setActivateCreate("n")}>Cancelar</button>
                        <button onClick={postNewHabit}>Salvar</button>
                    </div>
                </CreationCard>
            )
        }
    }

    function postNewHabit() {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        const promise = axios.post(URL, config);
        promise.then(response => setCurrentHabits([...currentHabits, response.data]))
    }

    function Habits({title}) {
        return (
            <HabitCard>
                <h1>{title}</h1>
                <span>{weekdays.map(day => <div>{day}</div>)}</span>
                <ion-icon name="trash-outline"></ion-icon>
            </HabitCard>
        )
    }
    return (
        <>
            <Header />
            <Content>
                <span>
                    <h2>Meus hábitos</h2>
                    <div onClick={() => setActivateCreate("y")}>
                        <ion-icon name="add"></ion-icon>
                    </div>
                </span>
                <CreateHabit active={activateCreate} />
                <CreatedHabits>
                    {currentHabits.length > 0 ? currentHabits.map(h => <Habits title={h.name} />) : <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}
                </CreatedHabits>
            </Content>
            <Footer />
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
}

p{
    font-size:20px;
    color:#666666;
    line-height:28px;
}
span{
    display:flex;
    justify-content:flex-start;
    position:relative;
    width:100%;
    height:60px;
}

span div{
    background-color:#52B6FF;
    height:35px;
    width:40px;
    border-radius:5px;
    position:absolute;
    right:0;
    top:0;
    display:flex;
    justify-content:center;
    align-items:center;
}
ion-icon{
    color:#FFFFFF;
    font-size:20px;
    --ionicon-stroke-width: 60px;
}
`

const CreatedHabits = styled.div`
display:flex;
flex-direction:column;
`

const CreationCard = styled.div`
background-color:#FFFFFF;
padding:20px;
border-radius:5px;
box-sizing:border-box;
margin-bottom:30px;
input{
    height:45px;
    width:100%;
    margin-bottom:10px;
    border:solid 1px #D4D4D4;
    border-radius:5px;
    font-size:20px;
    color:#666666;
    padding:0 10px;
    box-sizing:border-box;
}

div{
    display:flex;
}
div:last-child{
    margin-top:30px;
    justify-content:flex-end;
}

span{
    height:30px;
    width:30px;
    border-radius:5px;
    border:solid 1px #D4D4D4;
    font-size:20px;
    color:#DBDBDB;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:5px;
}

div button{
    width:84px;
    height:36px;
    border:none;
    border-radius:5px;
    margin-left:5px;
    font-size:16px;
}
div button:first-child{
    color:#52B6FF;
    background-color:#FFFFFF;
}
div button:last-child{
    color:#FFFFFF;
    background-color:#52B6FF;
}
`

const HabitCard = styled.div`
background-color:#FFFFFF;
padding:20px;
border-radius:5px;
box-sizing:border-box;
font-size:20px;
color:#666666;

div{
    height:30px;
    width:30px;
    border-radius:5px;
    border:solid 1px #D4D4D4;
    font-size:20px;
    color:#DBDBDB;
}

ion-icon{
    position:fixed;
    top:20px;
    right:20px;
    font-size:10px;
    color:#666666;
}
`