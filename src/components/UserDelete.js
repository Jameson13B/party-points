import React, { Component } from 'react'
import styled from 'styled-components'
import { database, functions } from '../firebase'
import { getInitials } from '../utils'
import Icon from '../components/Icon'
import { confirmAlert } from 'react-confirm-alert'
import './alert.css'

class DeleteUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
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
  handleDeleteUser = (id, deletedName) => {
    // Delete user in Auth with Cloud Functions
    const deleteUser = functions.httpsCallable('deleteUser')
    deleteUser({ id })
      .then(() => {
        database
          .collection('users')
          .doc(id)
          .delete()
          .then(() =>
            this.setState({
              feedback: `Successfully deleted ${deletedName}`
            })
          )
          .catch(() =>
            this.setState({ feedback: 'Failed to delete user from database' })
          )
      })
      .catch(() => this.setState({ feedback: 'Failed to delete user' }))
  }
  render() {
    return (
      <Container>
        {this.state.feedback ? (
          <Feedback>{this.state.feedback}</Feedback>
        ) : null}
        {/* List of Users */}
        <List>
          {this.state.users.map(user => (
            <User key={user.id} id={user.id} name={user.name}>
              <Initials>{getInitials(user.name)}</Initials>
              <Name>{user.name.substring(0, 20)}</Name>
              <CustomIcon
                icon='delete'
                onClick={e => {
                  confirmAlert({
                    title: 'Delete Student?',
                    message: `Are you sure you want to delete ${user.name}? This cannot be undone.`,
                    buttons: [
                      {
                        label: 'Yes',
                        onClick: () => this.handleDeleteUser(user.id, user.name)
                      },
                      {
                        label: 'No',
                        onClick: () => {}
                      }
                    ]
                  })
                }}
              />
            </User>
          ))}
        </List>
        ) }}
      </Container>
    )
  }
}

export default DeleteUser

const Container = styled.div`
  padding: 20px;
  height: 89%;
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  overflow: auto;
  height: 100%;
`
const User = styled.li`
  display: flex;
  border: 1px solid white;
  border-radius: 15px;
  padding: 2%;
  margin: 2% 0;
  cursor: pointer;
  line-height: 200%;
  width: 65%;
`
const Initials = styled.h1`
  font-size: 3rem;
  margin: auto 25px;
`
const Name = styled.h1`
  flex: 3;
  text-align: left;
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
`
const CustomIcon = styled(Icon)`
  :hover {
    color: red;
  }
`
const Feedback = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 5px;
`
