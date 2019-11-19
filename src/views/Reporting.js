import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import moment from 'moment-timezone'
import { database } from '../firebase'

class Reporting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [],
      logs: [],
      student: '',
      start: '',
      end: ''
    }
  }
  componentDidMount() {
    database.collection('users').onSnapshot(res => {
      let students = []
      let logs = []

      res.forEach(doc => students.push({ ...doc.data(), id: doc.id }))

      if (this.state.student) {
        database.collection('log').onSnapshot(res => {
          res.forEach(doc => logs.push({ ...doc.data(), id: doc.id }))
        })
      }

      this.setState({ students, logs })
    })
  }
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
  handleStudentSelect = (e, student) => {
    e.preventDefault()
    database
      .collection('log')
      .where('user', '==', student)
      .onSnapshot(res => {
        console.log('STUDENT', student)
        let logs = []
        res.forEach(doc => logs.push({ ...doc.data(), id: doc.id }))
        this.setState({ student, logs })
      })
  }
  render() {
    return (
      <Container>
        <View>
          {/* Header */}
          <Header>
            <CstmLink to='/'>
              <Icon icon='home' />
            </CstmLink>
            <h3>Reporting</h3>
            {/* Student Dropodown */}
            <Select
              onChange={e => this.handleStudentSelect(e, e.target.value)}
              value={this.state.student}
            >
              <option value=''>Select Student</option>
              {this.state.students.map(student => (
                <option value={student.id} key={student.id}>
                  {student.name}
                </option>
              ))}
            </Select>
            {/* Start Date */}
            <DateLabel>Start: </DateLabel>
            <DateInput
              type='date'
              name='start'
              value={this.state.start}
              onChange={this.handleInputChange}
            />
            {/* End Date */}
            <DateLabel>End: </DateLabel>
            <DateInput
              type='date'
              name='end'
              value={this.state.end}
              onChange={this.handleInputChange}
            />
          </Header>
          {/* Body */}
          <Body>
            {/* If log is empty return 'nothing to show' */}
            {this.state.logs.length === 0 && (
              <Entry>Nothing to show yet...</Entry>
            )}
            {this.state.logs
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map(log => {
                const date = moment(log.date.toDate())
                // If there is only the default change return 'select student'
                return !log.change ? (
                  <Entry key={log.id}>
                    <p>Select Student Above</p>
                  </Entry>
                ) : (
                  // Else if there is a log with change, create an Entry for each
                  <Entry key={log.id}>
                    <p>{log.change}</p>
                    <p>{log.description}</p>
                    <p>{date.tz('America/Boise').format('l LT')}</p>
                  </Entry>
                )
              })}
          </Body>
        </View>
      </Container>
    )
  }
}

export default Reporting

const Container = styled.div`
  background-color: #282c34;
  font-size: calc(10px + 2vmin);
  color: white;
`
const View = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 75%;
  height: 9vh;
`
const CstmLink = styled(Link)`
  text-decoration: none;
  color: white;
  vertical-align: middle;
  margin-right: 15px;
  :hover {
    color: #bbb;
  }
`
const Select = styled.select`
  background: #444;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid white;
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
const DateInput = styled.input`
  background: #444;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid white;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-left: 5px;
  :focus {
    outline: none;
  }
`
const DateLabel = styled.h1`
  margin-left: 20px;
  font-size: 1.25rem;
`
const Body = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  height: 84vh
  padding: 2vh;
  width: 75%;
  overflow: auto;
`
const Entry = styled.div`
  display: flex;
  justify-content: space-between
  padding: 15px;
  border-top: 1px solid white;
  :last-child {
    border-bottom: 1px solid white;
  }
`
