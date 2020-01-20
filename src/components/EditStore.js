import React, { Component } from 'react'
import styled from 'styled-components'
import { database } from '../firebase'
import InventoryItem from './InventoryItem'

class EditStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      creating: true,
      feedback: null,
      title: '',
      description: '',
      amount: '',
      id: '',
      index: '',
    }
  }
  componentDidMount() {
    if (this.state.items.length === 0) {
      database
        .collection('inventory')
        .get()
        .then(querySnapshot => {
          let items = []
          querySnapshot.forEach(doc => items.push({ ...doc.data(), id: doc.id }))
          items.sort((a, b) => (a.title > b.title ? 1 : -1))
          this.setState({ items })
        })
        .catch(feedback => this.setState({ feedback }))
    }
  }
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
  handleUpdateSelect = (title, description, amount, id, index) =>
    this.setState({
      title,
      description,
      amount,
      id,
      creating: false,
      index: index,
    })
  resetState = list => {
    this.setState({
      items: list,
      title: '',
      description: '',
      amount: '',
      id: '',
      index: '',
      feedback: null,
      creating: true,
    })
  }
  createItem = newItem => {
    const { title, amount } = this.state
    if (!title || !amount) return this.setState({ feedback: 'Missing title or amount' })
    if (isNaN(amount)) return this.setState({ feedback: 'Amount must be a number' })

    const list = [...this.state.items, newItem].sort((a, b) => (a.title > b.title ? 1 : -1))
    database
      .collection('inventory')
      .add(newItem)
      .then(() => this.resetState(list))
      .catch(feedback => this.setState({ feedback }))
  }
  deleteItem = (index, id) => {
    const list = this.state.items.slice()
    list.splice(index, 1)
    database
      .collection('inventory')
      .doc(id)
      .delete()
      .then(() => this.resetState(list))
      .catch(feedback => this.setState({ feedback }))
  }
  updateItem = newItem => {
    const { title, amount } = this.state
    if (!title || !amount) return this.setState({ feedback: 'Missing title or amount' })
    if (isNaN(amount)) return this.setState({ feedback: 'Amount must be a number' })

    const list = this.state.items.map(item => (item.id === newItem.id ? newItem : item))
    database
      .collection('inventory')
      .doc(newItem.id)
      .update(newItem)
      .then(() => this.resetState(list))
      .catch(feedback => this.setState({ feedback }))
  }
  render() {
    const newItem = {
      title: this.state.title,
      description: this.state.description,
      amount: parseInt(this.state.amount),
      id: this.state.id,
    }

    return (
      <Container>
        <ItemList>
          {this.state.items.map((item, i) => {
            return (
              <InventoryItem
                item={item}
                key={item.id}
                index={i}
                deleteItem={this.deleteItem}
                handleClick={this.handleUpdateSelect}
              />
            )
          })}
        </ItemList>
        <Form
          onSubmit={e => {
            e.preventDefault()
            this.state.creating ? this.createItem(newItem) : this.updateItem(newItem)
          }}
          autoComlete="none"
        >
          <Input
            name="title"
            type="text"
            value={this.state.title}
            placeholder="Item Title"
            onChange={this.handleInputChange}
          />
          <Input
            name="description"
            type="text"
            value={this.state.description}
            placeholder="Item Description"
            onChange={this.handleInputChange}
          />
          <Input
            name="amount"
            type="text"
            value={this.state.amount}
            placeholder="Item Amount"
            onChange={this.handleInputChange}
          />
          {this.state.creating ? (
            <SubmitBtn type="submit" width="100%">
              Create Item
            </SubmitBtn>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <SubmitBtn type="submit" width="48%">
                Update Item
              </SubmitBtn>
              <SubmitBtn
                onClick={e => {
                  e.preventDefault()
                  this.deleteItem(this.state.index, this.state.id)
                }}
                width="48%"
              >
                Delete Item
              </SubmitBtn>
            </div>
          )}
          {this.state.feedback ? <Feedback>{this.state.feedback}</Feedback> : null}
        </Form>
      </Container>
    )
  }
}

export default EditStore

const Container = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  height: 70vh;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`
const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 60%;
  overflow: auto;
`
const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40%;
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
const SubmitBtn = styled.button`
  background: transparent;
  border: 1px solid white;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  display: inline;
  font-size: 1.5rem;
  padding: 15px;
  margin: 15px 0;
  width: ${props => props.width}
  :hover {
    background: #444;
  }
`
const Feedback = styled.p`
  color: red;
  font-size: 1rem;
  margin: 0;
  text-align: center;
`
