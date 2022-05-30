import styled from 'styled-components';
import mainLogo from '../assets/images/Group 8.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'

export default function SignUpPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState("n");
    const [newUserData, setNewUserData] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });

    function sendNewUserData(e) {
        e.preventDefault();
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
        const promise = axios.post(URL, newUserData);
        setLoading("y");
        promise.then(() => navigate("/"));
        promise.catch(handleError);
    }

    function handleError(error) {
        alert(`${error.response.status} - ${error.response.data}`);
        setLoading("n");
    }

    function showField(field) {
        switch (field) {
            case "email":
                return newUserData.email;
            case "senha":
                return newUserData.password;
            case "nome":
                return newUserData.name;
            case "foto":
                return newUserData.image;
            default:
                return "";
        }
    }

    function modifyField(e, field) {
        switch (field) {
            case "email":
                setNewUserData({ ...newUserData, email: e.target.value })
                break
            case "senha":
                setNewUserData({ ...newUserData, password: e.target.value })
                break
            case "nome":
                setNewUserData({ ...newUserData, name: e.target.value })
                break
            case "foto":
                setNewUserData({ ...newUserData, image: e.target.value })
                break
            default:
                break;
        }
    }

    return (
        <Content loading={loading}>
            <img src={mainLogo} alt="main logo" />
            <form onSubmit={sendNewUserData}>
                <input type="email" placeholder='email' value={showField("email")} onChange={(e) => modifyField(e, "email")} required />
                <input type="password" placeholder='senha' value={showField("senha")} onChange={(e) => modifyField(e, "senha")} required />
                <input type="text" placeholder='nome' value={showField("nome")} onChange={(e) => modifyField(e, "nome")} required />
                <input type="url" placeholder='foto' value={showField("foto")} onChange={(e) => modifyField(e, "foto")} required />
                <button type="submit">{loading === "y" ? <ThreeDots color="#FFFFFF" height={80} width={80} /> : "Cadastrar"}</button>
            </form>
            <Link to="/" style={{ textDecoration: 'none' }}>Já tem uma conta? Faça login!</Link>
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
    background-color:${({ loading }) => loading === "y" ? "#F2F2F2" : "#FFFFFF"};
    height:45px;
    border:solid 1px #D4D4D4;
    border-radius:5px;
    font-family: 'Lexend Deca', sans-serif;
    color:${({ loading }) => loading === "y" ? "#AFAFAF" : "#DBDBDB"};
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
    background-color:${({ loading }) => loading === "y" ? "#75b6e6" : "#52B6FF"};
    color:#FFFFFF;
    font-size:20px;
    font-family: 'Lexend Deca', sans-serif;
}
`