import React, { Component } from 'react'
import styled from 'styled-components'
import { database, serverTimestamp } from '../firebase'
import Icon from '../components/Icon'
import AddNew from '../components/AddNew'

class PosBtnList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttons: [],
      deleting: false
    }
  }
  componentDidMount() {
    if (this.state.buttons.length === 0) {
      database.collection('positive').onSnapshot(res => {
        let buttons = []
        res.forEach(doc => buttons.push({ ...doc.data(), id: doc.id }))
        // Sort buttons by point amount
        buttons.sort((a, b) => (a.points > b.points ? 1 : -1))
        this.setState({ buttons })
      })
    }
  }
  toggleDeleting = () => this.setState({ deleting: !this.state.deleting })
  render() {
    return (
      <Container>
        <List>
          {this.state.buttons.map(button => {
            return (
              <Button
                key={button.id}
                deleting={this.state.deleting}
                onClick={e => {
                  e.preventDefault()
                  if (this.state.deleting) {
                    // Delete Button from Firebase
                    database
                      .collection('positive')
                      .doc(button.id)
                      .delete()
                      .then(() =>
                        this.setState({ feedback: 'Successfully Deleted' })
                      )
                      .catch(() =>
                        this.setState({ feedback: 'Failed to Delete' })
                      )
                  } else {
                    // Add Points to User
                    const logRef = database.collection('log').doc()
                    const userRef = database
                      .collection('users')
                      .doc(this.props.id)

                    database
                      .runTransaction(transaction => {
                        return transaction.get(userRef).then(user => {
                          const newBalance = user.data().balance + button.points
                          transaction.update(userRef, { balance: newBalance })
                          transaction.set(logRef, {
                            change: button.points,
                            description: button.title,
                            user: user.id,
                            date: serverTimestamp()
                          })
                        })
                      })
                      .then(() => {
                        console.log('Successfully Adding to Users Balance')
                        this.props.history.replace('/dashboard')
                      })
                      .catch(err =>
                        console.log('Error Adding to Users Balance', err)
                      )
                  }
                }}
              >
                <p>{button.title}</p>
                {!this.state.deleting ? (
                  <p>{button.points}</p>
                ) : (
                  <CustomIcon icon='delete' />
                )}
              </Button>
            )
          })}
        </List>
        <AddNew
          status='positive'
          toggleDeleting={this.toggleDeleting}
          id={this.props.id}
        />
      </Container>
    )
  }
}

export default PosBtnList

const Container = styled.div`
  margin: 25px auto;
  max-width: 600px;
  width: 90%;
`
const List = styled.ul`
  align-content: space-between;
  border: 1px solid white;
  border-radius: 15px;
  display flex;
  flex-wrap: wrap;
  height: 85%;
  list-style: none;
  justify-content: space-evenly;
  padding: 0 0 25px 0;
`
const Button = styled.li`
  border: 1px solid white;
  border-radius: 15px;
  padding: 1% 0;
  cursor: pointer;
  width: 30%;
  font-size: 1rem;
  margin-top: 25px;
  :hover {
    background: #444;
    border: ${props => props.deleting && '1px solid red'};
    i {
      color: ${props => props.deleting && 'red'};
    }
  }
`
const CustomIcon = styled(Icon)`
  margin: 0 5%;
  :hover {
    color: red;
  }
`
