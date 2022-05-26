import styled from 'styled-components'
import mainLogo from '../assets/images/Group 8.png'
import { Link } from 'react-router-dom'

export default function SignUpPage () {
    return(
        <Content>
            <img src={mainLogo} alt="main logo" />
            <forms>
                <input type="text" placeholder='email' />
                <input type="text" placeholder='senha' />
                <input type="text" placeholder='nome' />
                <input type="text" placeholder='foto' />
                <button type="submit">Cadastrar</button>
            </forms>
            <Link to="/">Já tem uma conta? Faça login!</Link>
        </Content>
    )
}

const Content = styled.div`
display:flex;
flex-direction:column;
align-items:center
`