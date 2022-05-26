import styled from 'styled-components'
import mainLogo from '../assets/images/Group 8.png'
import { Link } from 'react-router-dom'

export default function LoginPage () {
    return(
        <Content>
            <img src={mainLogo} alt="main logo" />
            <forms>
                <input type="text" placeholder='email' />
                <input type="text" placeholder='senha' />
                <button type="submit">Entrar</button>
            </forms>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </Content>
    )
}

const Content = styled.div`
display:flex;
flex-direction:column;
align-items:center
`