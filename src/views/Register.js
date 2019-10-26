import React from 'react'
import { database, functions } from '../firebase'
import styled from 'styled-components'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      track: '',
      name: '',
      error: null
    }
  }

  handleRegister = e => {
    e.preventDefault()
    const { email, password, track, name } = this.state
    if (!email || !password || !track || !name) {
      this.this.setState({ error: 'Missing Required Fields' })
    }

    const registerUser = functions.httpsCallable('registerUser')
    registerUser({
      email,
      password,
      name,
      track
    })
      .then(res => {
        database
          .collection('users')
          .doc(res.data.data.uid)
          .set({
            email,
            name,
            track,
            balance: 0
          })
          .then(() => {
            this.setState({
              error: `Successfully created ${profile.name}`,
              email: '',
              password: '',
              track: '',
              name: ''
            })
          })
          .catch(() => {
            this.setState({ error: 'Failed to add user to database' })
          })
      })
      .catch(err => {
        this.setState({ error: 'Failed to create user' })
      })
  }
  render() {
    return (
      <Container>
        <Title>Power Points</Title>
        <Message>Register Here</Message>
        <Form>
          <Label>Name:</Label>
          <Input
            autoComplete='off'
            type='text'
            id='name'
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Label>Track:</Label>
          <Input
            autoComplete='off'
            type='text'
            id='track'
            value={this.state.track}
            onChange={e => this.setState({ track: e.target.value })}
          />
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
          <Button onClick={this.handleRegister}>Register</Button>
          {this.state.error ? <Feedback>{this.state.error}</Feedback> : null}
          <DashboardLink
            onClick={() => this.props.history.push('/teacher-portal')}
          >
            Go To Dashboard
          </DashboardLink>
        </Form>
      </Container>
    )
  }
}

export default Register

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
const DashboardLink = styled.h1`
  color: black;
  font-size: 1rem;
  font-weight: normal;
  margin: 20px auto;
  text-decoration: none;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
const Feedback = styled.p`
  color: red;
  font-size: 0.9rem;
  font-style: italic;
  margin-bottom: 0px;
  text-align: center;
  width: 100%;
`
