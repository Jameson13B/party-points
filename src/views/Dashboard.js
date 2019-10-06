import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { database, auth } from '../firebase'
// import UserSummary from '../Components/Dashboard/DashboardUserSummary'
import Icon from '../components/Icon'
import styled from 'styled-components'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      class: localStorage.getItem('PP:dashboardFilter') || 'All'
    }
  }

  componentDidMount() {
    console.log(database)
    console.log(auth)
  }

  handleFilterChange = e => {
    localStorage.setItem('filterItem', e.target.value)
    this.setState({ class: e.target.value })
  }
  render() {
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
          <Select onChange={this.handleFilterChange} value={this.state.class}>
            <option value='All'>All</option>
            {/* {classes.map((clas, i) => (
              <option value={clas} key={i}>
                {clas.charAt(0).toUpperCase() + clas.slice(1)}
              </option>
            ))} */}
          </Select>
        </Header>
        {/* <UserList> */}
        {/* If class is filtered show class button */}
        {/* {this.state.class !== 'All' && <UserSummary user={classUser} />} */}
        {/* List all users for current filter */}
        {/* {users
            .sort((a, b) => {
              return a.name > b.name ? 1 : -1
            })
            .map(user => (
              <UserSummary key={user.id} user={user} />
            ))}
        </UserList> */}
      </Container>
    )
  }
}

export default Dashboard

const Container = styled.div`
  background-color: #282c34;
  color: white;
  font-size: calc(10px + 2vmin);
  // align-items: center;
  // min-height: 100vh;
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
// const UserList = styled.div`
//   align-content: flex-start;
//   border: 1px solid white;
//   border-radius: 15px;
//   display: flex;
//   flex-wrap: wrap;
//   height: 84vh;
//   justify-content: space-evenly;
//   overflow: auto;
//   padding: 2vh;
//   width: 75%;
// `
const CstmLink = styled(Link)`
  color: white;
  margin: 0 10px;
  text-decoration: none;
  vertical-align: middle;
  :hover {
    color: #bbb;
  }
`
