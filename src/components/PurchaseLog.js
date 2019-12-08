import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment-timezone'
import { database } from '../firebase'

class PurchaseLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: [],
    }
  }

  componentDidMount() {
    // Set date to 1am this morning
    let date = new Date()
    date.setHours(0, 0, 1, 0)

    database
      .collection('purchases')
      .where('date', '>=', date)
      .orderBy('date', 'desc')
      .onSnapshot(res => {
        let logs = []
        res.forEach(doc => {
          logs.push({ ...doc.data(), id: doc.id })
        })
        this.setState({ logs })
      })
  }

  render() {
    if (!this.state.logs.length) {
      return (
        <Container>
          <Entry>Nothing to show yet...</Entry>
        </Container>
      )
    }

    return (
      <Container>
        {this.state.logs.map(log => {
          const date = moment(log.date.toDate())

          return (
            <Entry key={log.id}>
              <p>{log.postedBy.name}</p>
              <p>
                {log.description} - {log.change}
              </p>
              <p>{date.tz('America/Boise').format('MMM Do, LT')}</p>
            </Entry>
          )
        })}
      </Container>
    )
  }
}

export default PurchaseLog

const Container = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  height: 70vh;
  overflow: auto;
`
const Entry = styled.div`
  display: flex;
  font-size: 1.5rem;
  justify-content: space-between
  padding: 15px 10px;
  border-top: 1px solid white;
  p {
    margin: 5px 0;
  }
  :last-child {
    border-bottom: 1px solid white;
  }
  @media (max-width: 768px) {
    align-items: center;
    flex-direction: column;
    font-size: 1rem;
  }
`
