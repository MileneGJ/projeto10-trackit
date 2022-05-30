import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import HabitContext from '../contexts/HabitContext';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

export default function HabitsPage() {
    const token = localStorage.getItem("token");
    const { currentHabits, setCurrentHabits } = useContext(HabitContext);
    const [activateCreate, setActivateCreate] = useState("n");
    const [newHabit, setNewHabit] = useState({
        name: "",
        days: []
    });

    useEffect(() => {
        updateHabitsList();
    }, [])

    function updateHabitsList() {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(URL, config);
        promise.then(response => setCurrentHabits(response.data))
    }

    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"]


    function Day({ day, index, selected }) {
        let checkbox = "n";
        if (selected!==undefined) {
            for (let i = 0; i < selected.length; i++) {
                if (index === selected[i]) {
                    checkbox = "y";
                }
            };
        }
        return (
            <Daybox onClick={() => selectDay(index)} checked={checkbox}>{day}</Daybox>
        )
    }

    function selectDay(index) {
        let includedDays = [];
        if (newHabit.days.length > 0) {
            includedDays = [...newHabit.days, index];
        } else {
            includedDays.push(index);
        }

        setNewHabit({ ...newHabit, days: includedDays });
    }

    function postNewHabit(e) {
        e.preventDefault();
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.post(URL, newHabit, config);
        promise.then(response => {
            setNewHabit({
                name: "",
                days: []
            })
            setCurrentHabits([...currentHabits, response.data]);
            setActivateCreate("n");
        }
        )
    }



    function Habits({ title, Hindex, selected }) {
        return (
            <HabitCard>
                <h1>{title}</h1>
                <div>{weekdays.map((day, Dindex) => <Day key={Dindex} index={Dindex} day={day} selected={selected} />)}</div>
                <ion-icon onClick={() => deleteHabit(Hindex)} name="trash"></ion-icon>
            </HabitCard>
        )
    }

    function deleteHabit(Hindex) {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${Hindex}`
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.delete(URL, config);
        promise.then(updateHabitsList);
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
                {activateCreate === "y" ?
                    <CreationCard>
                        <form onSubmit={e => postNewHabit(e)}>
                            <input type="text" placeholder='nome do hábito' value={newHabit.name} onChange={e => setNewHabit({ ...newHabit, name: e.target.value })} required />
                            <div>{weekdays.map((day, index) => <Day key={index} index={index} day={day} selected={newHabit.days} />)}</div>
                            <div>
                                <button onClick={() => setActivateCreate("n")}>Cancelar</button>
                                <button type="submit">Salvar</button>
                            </div>
                        </form>
                    </CreationCard>
                    : <></>}
                <CreatedHabits>
                    {currentHabits.length > 0 ?
                        currentHabits.map(h => <Habits key={h.id}
                            Hindex={h.id}
                            title={h.name}
                            selected={h.days} />) :
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}
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
    border:solid 1px #D4D4D4;
    border-radius:5px;
    font-size:20px;
    color:#666666;
    padding:0 10px;
    box-sizing:border-box;
}

div{
    display:flex;
    margin-top:10px;
}

span{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:5px;
    border-radius:5px;
    border:solid 1px #D4D4D4;
    font-size:20px;
    height:30px;
    width:30px;
}

div:last-child{
    margin-top:30px;
    justify-content:flex-end;
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
margin:10px 0;
font-size:20px;
color:#666666;
position:relative;

div{
    display:flex;
    margin-top:10px;
}
span{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:5px;
    border-radius:5px;
    border:solid 1px #D4D4D4;
    font-size:20px;
    height:30px;
    width:30px;
}

ion-icon{
    position:absolute;
    top:10px;
    right:15px;
    font-size:20px;
    color:#666666;
}
`

const Daybox = styled.span`
    background-color:${props => props.checked === "y" ? "#CFCFCF" : "#FFFFFF"};
    color:${props => props.checked === "y" ? "#FFFFFF" : "#DBDBDB"};
`