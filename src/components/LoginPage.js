import styled from 'styled-components'
import mainLogo from '../assets/images/Group 8.png'
import { Link } from 'react-router-dom'

export default function LoginPage () {
    return(
        <Content>
            <img src={mainLogo} alt="main logo" />
            <form>
                <input type="text" placeholder='email' />
                <input type="text" placeholder='senha' />
                <button type="submit">Entrar</button>
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
    height:45px;
    border:solid 1px #D4D4D4;
    border-radius:5px;
    font-family: 'Lexend Deca', sans-serif;
    color:#DBDBDB;
    font-size:20px;
    margin-bottom: 5px;
    padding:0 10px;
    box-sizing:border-box;
}
button{
    width:100%;
    height:45px;
    border:none;
    border-radius:5px;
    background-color:#52B6FF;
    color:#FFFFFF;
    font-size:20px;
    font-family: 'Lexend Deca', sans-serif;
}
`