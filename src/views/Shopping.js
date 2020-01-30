import React, { Component } from 'react'
import { auth, database, serverTimestamp } from '../firebase'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import StoreItem from '../components/StoreItem'
import Icon from '../components/Icon'
import { confirmAlert } from 'react-confirm-alert'
import '../components/alert.css'

class Shopping extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      feedback: null,
      items: [],
    }
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        database
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.data().track === 'Teacher') {
              this.props.history.push('/teacher-portal')
            } else {
              this.setState({ user: { ...doc.data(), id: doc.id } })
            }
          })
      } else {
        this.props.history.push('/login')
      }
    })
    database.collection('inventory').onSnapshot(res => {
      let items = []
      res.forEach(doc => items.push({ ...doc.data(), id: doc.id }))
      this.setState({ items })
    })
  }
  handlePurchase = item => {
    const user = this.state.user

    if (item.amount > user.balance) {
      this.setState({ feedback: 'Error: Not enough Party Points' })
    } else {
      const userRef = database.collection('users').doc(user.id)
      const logRef = database.collection('log').doc()
      const purchasesRef = database.collection('purchases').doc()
      const batch = database.batch()

      batch.update(userRef, { balance: user.balance - item.amount })
      batch.set(logRef, {
        change: item.amount,
        description: item.title,
        user: user.id,
        balance: user.balance - item.amount,
        date: serverTimestamp(),
      })
      batch.set(purchasesRef, {
        change: item.amount,
        description: `Purchased ${item.title}`,
        date: serverTimestamp(),
        postedBy: { id: user.id, name: user.name },
      })

      batch
        .commit()
        .then(() => {
          this.setState({
            feedback: `Successfully purchased ${item.title}`,
            user: { ...user, balance: user.balance - item.amount },
          })
        })
        .catch(err => {
          console.log(err)
          this.setState({
            feedback: 'Error: Please try again',
          })
        })
    }
  }
  render() {
    if (!this.state.user) {
      return (
        <Container>
          <h1>Loading</h1>
        </Container>
      )
    }

    return (
      <Container>
        <Header>
          <CstmLink to="/student-portal">
            <Icon icon="home" />
          </CstmLink>
          <h3>Shopping</h3>
          <CurBal>Balance - ${this.state.user.balance}</CurBal>
        </Header>
        <ItemList>
          {this.state.feedback ? <Feedback>{this.state.feedback}</Feedback> : null}
          {this.state.items.map(item => (
            <StoreItem
              key={item.id}
              item={item}
              onClick={() =>
                confirmAlert({
                  title: 'Purchase Item?',
                  message: `Are you sure you want to purchase a ${item.title}? This cannot be undone.`,
                  buttons: [
                    {
                      label: 'Yes',
                      onClick: () => this.handlePurchase(item),
                    },
                    {
                      label: 'No',
                      onClick: () => this.setState({ feedback: null }),
                    },
                  ],
                })
              }
            />
          ))}
        </ItemList>
      </Container>
    )
  }
}

export default Shopping

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
const CstmLink = styled(Link)`
  color: white;
  margin: 0 10px;
  text-decoration: none;
  vertical-align: middle;
  :hover {
    color: #bbb;
  }
`
const CurBal = styled.h5`
  flex-grow: 2;
  text-align: right;
`
const ItemList = styled.div`
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
const Feedback = styled.p`
  color: red;
  font-size: 1rem;
  font-style: italic;
  margin: 0 0 0 1.5rem;
  text-align: center;
  width: 100%;
`
