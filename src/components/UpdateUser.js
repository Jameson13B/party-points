import React, { Component } from 'react'
import styled from 'styled-components'
import { database, functions } from '../firebase'
import { getInitials } from '../utils'
import Icon from '../components/Icon'
import { confirmAlert } from 'react-confirm-alert'
import './alert.css'

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
      password: '',
      feedback: null,
    }
  }
  componentDidMount() {
    database.collection('users').onSnapshot((res) => {
      let users = []
      res.forEach((doc) => users.push({ ...doc.data(), id: doc.id }))
      this.setState({ users })
    })
  }
  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value })
  handleUserSelect = (user) =>
    this.setState({
      id: user.id,
      name: user.name,
      email: user.email,
      parentsEmail: user.parentsEmail || '',
      track: user.track || '',
    })
  updateUser = (e) => {
    e.preventDefault()
    const updateUser = functions.httpsCallable('updateUser')

    updateUser({
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      parentsEmail: this.state.parentsEmail,
      track: this.state.track,
    })
      .then((res) => {
        database
          .collection('users')
          .doc(res.data.data.uid)
          .update({
            email: this.state.email,
            name: this.state.name,
            parentsEmail: this.state.parentsEmail,
            track: this.state.track,
            balance: 0,
          })
          .then(() => {
            this.setState({
              id: '',
              name: '',
              email: '',
              parentsEmail: '',
              track: '',
              password: '',
              feedback: `Successfully updated ${this.state.name}`,
            })
          })
          .catch(() => {
            this.setState({ feedback: 'Failed to update user in database' })
          })
      })
      .catch(() => this.setState({ feedback: 'Failed to update user' }))
  }
  updatePassword = (e) => {
    e.preventDefault()
    const updatePassword = functions.httpsCallable('changePassword')

    updatePassword({
      id: this.state.id,
      password: this.state.password,
    })
      .then((res) =>
        this.setState({
          id: '',
          name: '',
          email: '',
          parentsEmail: '',
          track: '',
          password: '',
          feedback: res.data.message,
        }),
      )
      .catch(() => this.setState({ feedback: 'Failed to change password' }))
  }
  handleDeleteUser = (id, deletedName) => {
    const deleteUser = functions.httpsCallable('deleteUser')
    deleteUser({ id })
      .then(() => {
        database
          .collection('users')
          .doc(id)
          .delete()
          .then(() =>
            this.setState({
              id: '',
              name: '',
              email: '',
              parentsEmail: '',
              track: '',
              password: '',
              feedback: `Successfully deleted ${deletedName}`,
            }),
          )
          .catch(() => this.setState({ feedback: 'Failed to delete user from database' }))
      })
      .catch(() => this.setState({ feedback: 'Failed to delete user' }))
  }

  render() {
    return (
      <Container>
        {/* List of Users */}
        <List>
          {this.state.users
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((user) => (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
                onClick={() => this.handleUserSelect(user)}
              >
                <Initials>{getInitials(user)}</Initials>
                <Name>{user.name.substring(0, 20)}</Name>
                <CustomIcon
                  icon="delete"
                  onClick={(e) => {
                    e.stopPropagation()
                    confirmAlert({
                      title: 'Delete Student?',
                      message: `Are you sure you want to delete ${user.name}? This cannot be undone.`,
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () => this.handleDeleteUser(user.id, user.name),
                        },
                        {
                          label: 'No',
                          onClick: () => {},
                        },
                      ],
                    })
                  }}
                  size="1.5"
                />
              </User>
            ))}
        </List>
        {/* Form to Update */}
        <Body>
          <Form onSubmit={this.updateUser} autoComplete="none">
            <Input
              name="name"
              type="text"
              value={this.state.name}
              placeholder="Students Name"
              onChange={this.handleInputChange}
            />
            <Input
              name="email"
              type="email"
              value={this.state.email}
              placeholder="Students Email"
              onChange={this.handleInputChange}
            />
            <Input
              name="parentsEmail"
              type="text"
              value={this.state.parentsEmail}
              placeholder="Parents Email"
              onChange={this.handleInputChange}
            />
            <Input
              name="track"
              type="text"
              value={this.state.track}
              placeholder="Class Name"
              onChange={this.handleInputChange}
            />
            <UpdateButton type="submit">Update</UpdateButton>
          </Form>
          <Form onSubmit={this.updatePassword} autoComplete="none">
            <Input
              name="password"
              type="password"
              value={this.state.password}
              placeholder="New Password"
              onChange={this.handleInputChange}
            />
            <UpdateButton type="submit">Update</UpdateButton>
          </Form>
          {this.state.feedback ? <Feedback>{this.state.feedback}</Feedback> : null}
        </Body>
      </Container>
    )
  }
}

export default UpdateUser

const Container = styled.div`
  padding: 10px 0;
  display: flex;
  height: 100%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`
const List = styled.ul`
  flex: 1.5;
  height: 100%;
  list-style: none;
  padding-left: 0;
  margin: 5px 0 0 0;
  overflow: auto;
  @media (max-width: 600px) {
    flex: auto;
    height: 40%;
  }
`
const User = styled.li`
  display: flex;
  align-items: center;
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
  @media (max-width: 600px) {
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
const CustomIcon = styled(Icon)`
  margin: 0 5%;
  :hover {
    color: red;
  }
`
const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 600px) {
    justify-content: flex-start;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  &:last-of-type {
    border-top: 2px dashed white;
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
  &:last-of-type {
    margin-bottom: 0;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
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
  margin: 5px 0 15px 0;
  :hover {
    background: #444;
  }
  @media (max-width: 768px) {
    padding: 10px;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`
const Feedback = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 5px;
`
