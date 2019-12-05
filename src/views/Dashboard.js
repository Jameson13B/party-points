import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { database } from '../firebase'
import UserSummary from '../components/UserSummary'
import Icon from '../components/Icon'
import styled from 'styled-components'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      track: localStorage.getItem('PP:dashboardFilter') || 'All',
      users: []
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

  handleFilterChange = e => {
    localStorage.setItem('PP:dashboardFilter', e.target.value)
    this.setState({ track: e.target.value })
  }
  render() {
    let users = this.state.users
    // Filter users and create class button
    let classUser = {
      id: '',
      name: '',
      balance: '',
      class: ''
    }
    if (this.state.track !== 'All') {
      users = this.state.users.filter(user => user.track === this.state.track)
      classUser.id = `${this.state.track} Class`
      classUser.name = `${this.state.track} Class`
      classUser.class = this.state.track
    }
    // Create list for filter
    let classes = []
    this.state.users.forEach(
      user => !classes.includes(user.track) && classes.push(user.track)
    )

    return (
      <Container>
        <Header>
          <CstmLink
            to='/teacher-portal'
            onClick={() => localStorage.removeItem('filterItem')}
          >
            <Icon icon='home' />
          </CstmLink>
          <h3>Dashboard</h3>
          <Select onChange={this.handleFilterChange} value={this.state.track}>
            <option value='All'>All</option>
            {classes.map((clas, i) => (
              <option value={clas} key={i}>
                {clas.charAt(0).toUpperCase() + clas.slice(1)}
              </option>
            ))}
          </Select>
        </Header>
        <UserList>
          {/* If class is filtered show class button */}
          {this.state.track !== 'All' && <UserSummary user={classUser} />}
          {/* List all users for current filter */}
          {users
            .sort((a, b) => {
              return a.name > b.name ? 1 : -1
            })
            .map(user => (
              <UserSummary key={user.id} user={user} />
            ))}
        </UserList>
      </Container>
    )
  }
}

export default Dashboard

const Container = styled.div`
  align-items: center;
  background-color: #282c34;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  min-height: 100vh;
`
const Header = styled.div`
  align-items: center;
  display: flex;
  height: 9vh;
  justify-content: flex-start;
  width: 75%;
`
const Select = styled.select`
  background: #444;
  border-bottom: 1px solid white;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  color: white;
  font-size: 1rem;
  margin-left: 15px;
  :focus {
    outline: none;
  }
  option {
    text-transform: uppercase;
  }
`
const UserList = styled.div`
  align-content: flex-start;
  border: 1px solid white;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  height: 84vh;
  justify-content: space-evenly;
  overflow: auto;
  padding: 2vh;
  width: 75%;
`
const CstmLink = styled(Link)`
  color: white;
  margin: 0 10px;
  text-decoration: none;
  vertical-align: middle;
  :hover {
    color: #bbb;
  }
`
