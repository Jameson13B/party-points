import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { auth, database } from '../firebase'
import styled from 'styled-components'
// import Icon from '../components/Icon'

class Student extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        database
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            this.setState({ user: { ...doc.data(), id: doc.id } })
          })
      } else {
        this.props.history.push('/login')
      }
    })
  }
  render() {
    if (!this.state.user) {
      return (
        <Container>
          <h1>Loading</h1>
        </Container>
      )
    }

    return (
      <Container>
        <Name>Hey {this.state.user.name}!</Name>
        <Balance>
          Your party point balance is
          <CurBalance>{this.state.user.balance}</CurBalance>
        </Balance>
        <Email>Email: {this.state.user.email}</Email>
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
const Email = styled.h1`
  font-size: 1.5rem;
`
const Logout = styled.h1`
  background: #3e4450;
  border-radius: 10px;
  margin: 20px auto;
  padding: 10px;
  :hover {
    cursor: pointer;
  }
`
