import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { database, auth } from '../firebase'
import styled from 'styled-components'
import Icon from '../components/Icon'

const Teacher = props => {
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        database
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.data().track !== 'Teacher') {
              props.history.push('/student-portal')
            }
          })
      } else {
        props.history.push('/login')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <Logout
        onClick={() => {
          console.log(auth)
          auth.signOut()
        }}
      >
        Logout
      </Logout>
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
