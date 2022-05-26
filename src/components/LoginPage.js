import styled from 'styled-components'
import mainLogo from '../assets/images/Group 8.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'

export default function LoginPage() {
    const navigate = useNavigate();
    const [loading,setLoading] = useState("n");
    const [loginInfo, setloginInfo] = useState({
        email: "",
        password: ""
    })

    function goToToday(e) {
        e.preventDefault();
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const promise = axios.post(URL, loginInfo);
        setLoading("y");
        promise.then(() => navigate("/hoje"));
        promise.catch(handleError)
    }

    function handleError(error) {
        alert(`${error.response.status} - ${error.response.data}`);
        setLoading("n");
    }

    function showField(field) {
        switch (field) {
            case "email":
                return loginInfo.email;
            case "senha":
                return loginInfo.password;
            default:
                return "";
        }
    }

    function modifyField(e, field) {
        switch (field) {
            case "email":
                setloginInfo({ ...loginInfo, email: e.target.value })
                break
            case "senha":
                setloginInfo({ ...loginInfo, password: e.target.value })
                break
            default:
                break;
        }
    }
    return (
        <Content loading={loading}>
            <img src={mainLogo} alt="main logo" />
            <form onSubmit={goToToday}>
                <input type="email" placeholder='email' value={showField("email")} onChange={(e)=>modifyField(e,"email")} />
                <input type="password" placeholder='senha' value={showField("senha")} onChange={(e)=>modifyField(e,"senha")} />
                <button type="submit">{loading==="y"?<ThreeDots color="#FFFFFF" height={80} width={80}/>:"Entrar"}</button>
            </form>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </Content>
    )
}

const Content = styled.div`
margin-top:70px;
display:flex;
flex-direction:column;
align-items:center;
padding:0 40px;
box-sizing:border-box;

form{
    display:block;
    margin:40px 0 30px 0;
}
input{
    width:100%;
    background-color:${({loading})=>loading==="y"?"#F2F2F2":"#FFFFFF"};
    height:45px;
    border:solid 1px #D4D4D4;
    border-radius:5px;
    font-family: 'Lexend Deca', sans-serif;
    color:${({loading})=>loading==="y"?"#AFAFAF":"#DBDBDB"};
    font-size:20px;
    margin-bottom: 5px;
    padding:0 10px;
    box-sizing:border-box;
}
button{
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:45px;
    border:none;
    border-radius:5px;
    background-color:${({loading})=>loading==="y"?"#75b6e6":"#52B6FF"};
    color:#FFFFFF;
    font-size:20px;
    font-family: 'Lexend Deca', sans-serif;
}
`