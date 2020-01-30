import React, { useEffect, useState } from 'react'
import { auth, database } from '../firebase'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const Student = props => {
  const [user, setUser] = useState(null)
  const [storeOpen, setStoreOpen] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        database
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.data().track === 'Teacher') {
              props.history.push('/teacher-portal')
            } else {
              setUser({ ...doc.data(), id: doc.id })
            }
          })
      } else {
        props.history.push('/login')
      }
    })
    database
      .collection('settings')
      .doc('1')
      .onSnapshot(doc => setStoreOpen(doc.data().storeOpen))
  }, [props.history, user, storeOpen])

  return !user ? (
    <Container>
      <h1>Loading</h1>
    </Container>
  ) : (
    <Container>
      <Name>Hey {user.name}!</Name>
      <Balance>
        Your party point balance is
        <CurBalance>{user.balance}</CurBalance>
      </Balance>
      {storeOpen ? (
        <StoreButton to="/shopping">
          <Icon icon="shopping_cart" />
          <ButtonText>Go Shopping</ButtonText>
        </StoreButton>
      ) : (
        <DisabledButton>
          <Icon icon="remove_shopping_cart" />
          <ButtonText>Store Closed</ButtonText>
        </DisabledButton>
      )}
      <Email>Email: {user.email}</Email>
      <Logout
        onClick={() => {
          auth.signOut()
        }}
      >
        Logout
      </Logout>
      <br />
    </Container>
  )
}

export default Student

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
  h1 {
    margin: 25px 0;
    :nth-child(1) {
      margin-top: 0;
    }
  }
`
const Name = styled.h1`
  font-size: 3.5rem;
`
const Balance = styled.h1`
  font-size: 2.25rem;
`
const CurBalance = styled.p`
  text-align: center;
  font-size: 3.5rem;
  font-weight: 900;
  margin: 20px 0 0;
`
const StoreButton = styled(Link)`
  background: #3e4450;
  border-radius: 10px;
  color: white;
  display: flex;
  font-weight: bold;
  align-items: center;
  margin: 20px auto;
  padding: 10px;
  text-decoration: none;
  :hover {
    cursor: pointer;
  }
`
const DisabledButton = styled.div`
  background: #3e4450;
  border-radius: 10px;
  color: white;
  display: flex;
  font-weight: bold;
  align-items: center;
  margin: 20px auto;
  padding: 10px;
  text-decoration: none;
  :hover {
    cursor: not-allowed;
  }
`
const ButtonText = styled.h2`
  display: inline;
  margin: 0;=
`
const Email = styled.h1`
  font-size: 1.5rem;
`
const Logout = styled.h2`
  background: #3e4450;
  border-radius: 10px;
  margin: 20px auto;
  padding: 10px;
  :hover {
    cursor: pointer;
  }
`
