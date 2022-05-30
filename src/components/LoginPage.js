import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import UserContext from "../contexts/UserContext";
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'
import styled from 'styled-components'
import mainLogo from '../assets/images/Group 8.png'

export default function LoginPage() {
    const navigate = useNavigate();
    const {setUserData} = useContext(UserContext) 
    const [loading,setLoading] = useState("n");
    const [loginInfo, setloginInfo] = useState({
        email: "",
        password: ""
    })

    function sendUserData(e) {
        e.preventDefault();
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const promise = axios.post(URL, loginInfo);
        setLoading("y");
        promise.then(goToToday);
        promise.catch(handleError)
    }

    function goToToday (response) {
        setUserData(response.data);
        localStorage.setItem("token", response.data.token)
        navigate("/hoje");
    }

    function handleError(error) {
        let message = ""
        if(error.response.status===401||error.response.status===422){
            message = "E-mail ou senha incorretos";
        } else {
            message = error.response.data
        }
        alert(`${error.response.status} - ${message}`);
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
            <form onSubmit={sendUserData}>
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
    background-color:${({loading})=>loading==="y"?"#8ab9db":"#52B6FF"};
    color:#FFFFFF;
    font-size:20px;
    font-family: 'Lexend Deca', sans-serif;
}
`