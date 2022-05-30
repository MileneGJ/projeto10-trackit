import styled from 'styled-components';
import { useContext } from 'react';
import ProgressContext from '../contexts/ProgressContext';
import { Link } from 'react-router-dom';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Footer() {
    const { progress } = useContext(ProgressContext);

    return (
        <FooterContainer>
            <Link to="/habitos" style={{ textDecoration: 'none' }}><p>Hábitos</p></Link>
            <Link to="/hoje" style={{ textDecoration: 'none' }}>
                <div>
                    <CircularProgressbar 
                    value={progress} 
                    text="Hoje"
                    styles={buildStyles({
                        // Colors
                        pathColor: `#FFFFFF`,
                        textColor: '#FFFFFF',
                        trailColor: 'transparent',
                        backgroundColor: 'transparent',
                      })} /></div></Link>
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
    padding:5px;
    border-radius:50px;
    color:#FFFFFF;
    font-size:18px;
    background-color:#52B6FF;
    margin-bottom:40px;
    width:90px;
    height:90px;
}
`