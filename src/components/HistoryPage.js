import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";


export default function HistoryPage () {
    const token = localStorage.getItem("token");
    const [currentHabits,setCurrentHabits] = useState([]);

    useEffect(()=>{
        const URL="https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(URL,config);
        promise.then(response=>{
            setCurrentHabits(response.data);
            console.log(response.data);
        });
    },[])

    function Habit({title,done,date}) {
        let checkDone="n";
        if(done){
            checkDone="y";
        }
        return (
            <HabitCard done={checkDone}>
                    <h3>{`${date} - ${title}`}</h3>
                <div>
                    <ion-icon name="checkmark"></ion-icon>
                </div>
            </HabitCard>
        )
    }

    function scanHabits (day){
        if(day.habits.length>0){
        return(
            <>
            {
                day.habits.map(h=>
                    <Habit key={h.id} title={h.name} done={h.done}
                    date={day.day}/>
                )
            }  
            </>
        )
        }     
    }

    return(
        <>
        <Header></Header>
        <Content>
        <h2>Histórico</h2>
        {currentHabits.length>0?currentHabits.map(day=>scanHabits(day))
        :<p>Em breve você poderá ver o histórico dos seus hábitos aqui! </p>}
        </Content>
        <Footer></Footer>
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
}`

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
    margin-bottom:0 10px 10px 0;
    word-wrap: break-word;
}

div{
    width:70px;
    height:70px;
    background-color:${({done})=>done==="y"?"#8FC549":"#EBEBEB"};
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

`