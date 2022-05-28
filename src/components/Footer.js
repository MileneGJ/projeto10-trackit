import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { Link } from 'react-router-dom';

export default function Footer() {
    const { userData } = useContext(UserContext);

    return (
        <FooterContainer>
            <Link to="/habitos" style={{ textDecoration: 'none' }}><p>Hábitos</p></Link>
            <div>Hoje</div>
            <Link to="/historico" style={{ textDecoration: 'none' }}><p>Histórico</p></Link>
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
position:fixed;
bottom:0;
left:0;
width:100%;
height: 70px;
background-color:#FFFFFF;
display:flex;
justify-content:space-around;
align-items:center;

p{
    color:#52B6FF;
    font-size:18px;  
    
}

div{
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:50px;
    color:#FFFFFF;
    font-size:18px;
    background-color:#52B6FF;
    margin-bottom:40px;
    width:90px;
    height:90px;
}
`