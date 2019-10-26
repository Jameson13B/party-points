import React, { Component } from 'react'
import styled from 'styled-components'
import { database, functions } from '../firebase'
import { getInitials } from '../utils'

class UpdateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      id: '',
      name: '',
      email: '',
      parentsEmail: '',
      track: '',
      feedback: null
    }
  }
  componentDidMount() {
    database.collection('users').onSnapshot(res => {
      let users = []
      res.forEach(doc => {
        if (doc.data().track !== 'Teacher')
          users.push({ ...doc.data(), id: doc.id })
      })
      this.setState({ users })
    })
  }
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
  handleUserSelect = user =>
    this.setState({
      id: user.id,
      name: user.name,
      email: user.email,
      parentsEmail: user.parentsEmail || '',
      track: user.track || '',
      feedback: null
    })
  updateUser = e => {
    e.preventDefault()
    const updateUser = functions.httpsCallable('updateUser')
    updateUser({
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      parentsEmail: this.state.parentsEmail,
      track: this.state.track
    })
      .then(res => {
        database
          .collection('users')
          .doc(res.data.data.uid)
          .update({
            email: this.state.email,
            name: this.state.name,
            parentsEmail: this.state.parentsEmail,
            track: this.state.track,
            balance: 0
          })
          .then(() => {
            this.setState({
              feedback: `Successfully updated ${res.data.data.displayName}`,
              email: '',
              password: '',
              track: '',
              name: ''
            })
          })
          .catch(() => {
            this.setState({ feedback: 'Failed to update user in database' })
          })
      })
      .catch(() => this.setState({ feedback: 'Failed to update user' }))
  }
  render() {
    return (
      <Container>
        {/* List of Users */}
        <List>
          {this.state.users.map(user => (
            <User
              key={user.id}
              id={user.id}
              name={user.name}
              onClick={() => this.handleUserSelect(user)}
            >
              <Initials>{getInitials(user.name)}</Initials>
              <Name>{user.name.substring(0, 20)}</Name>
            </User>
          ))}
        </List>
        {/* Form to Update */}
        <Form onSubmit={this.updateUser} autoComplete='none'>
          <Input
            name='name'
            type='text'
            value={this.state.name}
            placeholder='Students Name'
            onChange={this.handleInputChange}
          />
          <Input
            name='email'
            type='email'
            value={this.state.email}
            placeholder='Students Email'
            onChange={this.handleInputChange}
          />
          <Input
            name='parentsEmail'
            type='text'
            value={this.state.parentsEmail}
            placeholder='Parents Email'
            onChange={this.handleInputChange}
          />
          <Input
            name='track'
            type='text'
            value={this.state.track}
            placeholder='Class Name'
            onChange={this.handleInputChange}
          />
          <UpdateButton type='submit'>Update</UpdateButton>
          {this.state.feedback ? (
            <Feedback>{this.state.feedback}</Feedback>
          ) : null}
        </Form>
      </Container>
    )
  }
}

export default UpdateUser

const Container = styled.div`
  padding: 10px;
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
    height: 44%;
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
  height: 100%;
  @media (max-width: 768px) {
    flex: auto;
    height: 55%;
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
  margin: 15px 0;
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
  margin: 15px 0;
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
