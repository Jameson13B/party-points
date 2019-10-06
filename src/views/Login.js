import React from 'react'
import PropTypes from 'prop-types'
import { auth } from '../firebase'
import { Redirect } from 'react-router'
import styled from 'styled-components'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: null,
      user: null
    }
  }
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      user && this.setState({ user })
    })
  }
  handleLogin = e => {
    e.preventDefault()
    if (!this.state.email || !this.state.password)
      this.this.setState({ error: 'Email and Password Required' })

    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.history.push('/teacher-portal'))
      .catch(error => this.setState({ error }))
  }
  render() {
    if (this.state.user) {
      return <Redirect to='/teacher-portal' />
    } else {
      return (
        <Container>
          <Title>Party Points</Title>
          <Message>Login Here</Message>
          <Form>
            <Label>Email:</Label>
            <Input
              autoComplete='off'
              type='email'
              id='email'
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <Label>Password:</Label>
            <Input
              autoComplete='off'
              type='password'
              id='password'
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <Button onClick={this.handleLogin}>Login</Button>
            {this.state.error ? <Feedback>this.state.error</Feedback> : null}
          </Form>
        </Container>
      )
    }
  }
}

export default Login

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 20px;
`
const Title = styled.h1`
  margin-bottom: 5px;
`
const Message = styled.p`
  margin: 10px 0;
`
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;
  max-width: 450px;
`
const Label = styled.label`
  margin-right: 5%;
  width: 20%;
`
const Input = styled.input`
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 20px;
  width: 70%;
`
const Button = styled.button`
  background: black;
  border-radius: 15px;
  color: white;
  padding: 10px 0;
  width: 100%;
`
const Feedback = styled.p`
  color: red;
  font-style: italic;
`
