import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../components/Icon'

const Teacher = props => {
  if (props.auth.isLoaded && props.auth.isEmpty) {
    return <Redirect to='/login' />
  }
  // Check if not a teacher and redirect to student
  return (
    <Container>
      <Title>Party Points Teacher Page</Title>
      <BtnPanel>
        <IconBtn>
          <CstmLink to='/dashboard'>
            <p>Dashboard</p>
            <Icon icon='dashboard' />
          </CstmLink>
        </IconBtn>
        <IconBtn>
          <CstmLink to='/reports'>
            <p>Reporting</p>
            <Icon icon='description' />
          </CstmLink>
        </IconBtn>
        <IconBtn>
          <CstmLink to='/register'>
            <p>New User</p>
            <Icon icon='person_add' />
          </CstmLink>
        </IconBtn>
        <IconBtn>
          <CstmLink to='/admin'>
            <p>Edit User</p>
            <Icon icon='person' />
          </CstmLink>
        </IconBtn>
        <IconBtn>
          <CstmLink to='/store'>
            <p>Store</p>
            <Icon icon='store' />
          </CstmLink>
        </IconBtn>
      </BtnPanel>
      <Logout onClick={() => props.firebase.logout()}>Logout</Logout>
      <br />
    </Container>
  )
}

export default Teacher

const Container = styled.div`
  align-items: center;
  background-color: #282c34;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  a {
    margin: 30px auto;
  }
`
const Title = styled.h1`
  font-size: 2.5rem;
  margin: 30px auto;
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`
const BtnPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 65%;
  @media (max-width: 600px) {
    width: 100%;
  }
`
const IconBtn = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 15px;
  padding: 15px;
  text-align: center;
  width: 25%;
  :hover {
    background: #444;
  }
  i {
    display: block;
    padding: 15px;
  }
`
const CstmLink = styled(Link)`
  color: white;
  font-size: 1.25rem;
  text-decoration: none;
`
const Logout = styled.h1`
  margin: 20px auto;
  text-decoration: none;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
