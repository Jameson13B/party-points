import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../components/Icon'
import UpdateUser from '../components/UpdateUser'

export const EditUser = () => {
  return (
    <Container>
      <Header>
        <CstmLink to="/">
          <Icon icon="home" />
        </CstmLink>
        <h3>Edit User</h3>
      </Header>
      <Body>
        <UpdateUser />
      </Body>
    </Container>
  )
}

const Container = styled.div`
  align-items: center;
  background-color: #282c34;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  min-height: 100vh;
  text-align: center;
`
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 75%;
  height: 9vh;
`
const CstmLink = styled(Link)`
  text-decoration: none;
  color: white;
  vertical-align: middle;
  margin-right: 15px;
  :hover {
    color: #bbb;
  }
`
const Body = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  height: 84vh;
  padding: 2vh;
  width: 75%;
`
const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const NavBtn = styled.div`
  background: ${(props) => (props.selected ? '#444' : null)};
  border: 1px solid white;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  padding: 15px;
  width: 20%;
  :hover {
    background: #444;
  }
`
