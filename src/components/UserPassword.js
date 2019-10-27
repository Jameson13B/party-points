import React, { Component } from 'react'
import styled from 'styled-components'
import { database, functions } from '../firebase'
import { getInitials } from '../utils'

class UserPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      name: '',
      id: '',
      users: [],
      feedback: null
    }
  }
  componentDidMount() {
    database.collection('users').onSnapshot(res => {
      let users = []
      res.forEach(doc => users.push({ ...doc.data(), id: doc.id }))
      this.setState({ users })
    })
  }
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
  handleUserSelect = e =>
    this.setState({
      id: e.currentTarget.id,
      name: e.currentTarget.getAttribute('name'),
      feedback: null,
      password: ''
    })
  render() {
    return (
      <Container>
        {/* List of Users */}
        <List>
          {this.state.users
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(user => (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
                onClick={this.handleUserSelect}
              >
                <Initials>{getInitials(user)}</Initials>
                <Name>{user.name.substring(0, 20)}</Name>
              </User>
            ))}
        </List>
        {/* Form to Delete */}
        <Form
          onSubmit={e => {
            e.preventDefault()
            const changePassword = functions.httpsCallable('changePassword')
            changePassword({
              id: this.state.id,
              password: this.state.password
            })
              .then(res =>
                this.setState({
                  feedback: res.data.message,
                  password: '',
                  name: '',
                  id: ''
                })
              )
              .catch(() =>
                this.setState({ feedback: 'Failed to change password' })
              )
          }}
          autoComplete='off'
        >
          {this.state.name ? <h1>{this.state.name}</h1> : null}
          {this.state.feedback ? (
            <Feedback>{this.state.feedback}</Feedback>
          ) : null}
          <Input
            name='password'
            type='password'
            value={this.state.password}
            placeholder='New Password'
            onChange={this.handleInputChange}
          />
          <UpdateButton type='submit'>Update</UpdateButton>
        </Form>
      </Container>
    )
  }
}

export default UserPassword

const Container = styled.div`
  padding: 10px 0;
  display: flex;
  height: 89%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`
const List = styled.ul`
  flex: 1.25;
  list-style: none;
  padding-left: 0;
  overflow: auto;
  @media (max-width: 768px) {
    flex: auto;
    height: 75%;
  }
`
const User = styled.li`
  display: flex;
  border: 1px solid white;
  border-radius: 15px;
  padding: 2% 0;
  margin: 0 0 5% 0;
  cursor: pointer;
  line-height: 200%;
  width: 96%;
  :hover {
    background: #444;
  }
`
const Initials = styled.h1`
  font-size: 2.5rem;
  margin: auto 25px;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`
const Name = styled.h1`
  flex: 3;
  text-align: left;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
`
const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    flex: auto;
  }
`
const Input = styled.input`
  background: transparent;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid white;
  color: white;
  font-size: 1.25rem;
  margin: 5px 0;
  :focus {
    outline: none;
  }
`
const UpdateButton = styled.button`
  background: transparent;
  border: 1px solid white;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 15px;
  margin: 5px 0;
  :hover {
    background: #444;
  }
  @media (max-width: 768px) {
    padding: 10px;
  }
`
const Feedback = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 5px;
`
