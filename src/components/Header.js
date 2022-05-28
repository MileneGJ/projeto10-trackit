import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

export default function Header() {
    const { userData } = useContext(UserContext);

    return (
        <HeaderContainer>
            <h1>TrackIt</h1>
            <img src={userData.image} alt="User Profile" />
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
position:fixed;
top:0;
left:0;
width:100%;
height:70px;
background-color:#126BA5;
font-family: 'Playball', cursive;
display:flex;
justify-content:space-between;
align-items:center;
padding: 0 20px;
box-sizing:border-box;
color:#FFFFFF;
font-size:40px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

img{
    width:50px;
    height:50px;
    border-radius:50px;
    overflow:hidden;
}
`