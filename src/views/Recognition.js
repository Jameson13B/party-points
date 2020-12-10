import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export const Recognition = (props) => {
  return (
    <Container>
      <Header>
        <CstmLink to="/">
          <Icon icon="home" />
        </CstmLink>
        <h3>Recognition</h3>
      </Header>
      <Body>
        <h4>Coming Soon!</h4>
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
