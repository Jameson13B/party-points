import React, { Component } from 'react'
import styled from 'styled-components'
import { database } from '../firebase'

class AddNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      points: '',
      title: '',
      deleting: false
    }
  }
  handleSave = () => {
    if (!this.state.title || !this.state.points) {
      alert('Title and amount cannot be blank')
    } else if (isNaN(this.state.points)) {
      alert('Amount must be a number')
    } else {
      // Create new button
      const button = {
        title: this.state.title,
        points: parseInt(this.state.points)
      }
      // Add to database
      database
        .collection(this.props.status)
        .add(button)
        .then(() => this.setState({ points: '', title: '' }))
        .catch(() => alert('Error Adding: Please try again'))
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Container>
        <Button
          onClick={() => {
            this.props.toggleDeleting()
            this.setState({ deleting: !this.state.deleting })
          }}
        >
          {this.state.deleting ? <p>Done</p> : <p>Delete</p>}
        </Button>
        <Button onClick={this.handleSave}>
          <p>Add New</p>
        </Button>
        <Input
          name='points'
          value={this.state.points}
          placeholder='Points'
          onChange={this.handleChange}
          autoComplete='off'
        />
        <Input
          name='title'
          value={this.state.title}
          placeholder='Title'
          onChange={this.handleChange}
          autoComplete='off'
        />
      </Container>
    )
  }
}

export default AddNew

const Container = styled.form`
  display: flex
  padding: 25px 15px
`
const Button = styled.div`
  align-items: center
  border: 1px solid white
  border-radius: 15px
  cursor: pointer
  display: flex
  font-size: 1rem
  justify-content: center
  max-height: 50px
  padding: 10px
  max-width: 15%
  :hover {
    background: #444
  }
  p {
    margin: 0
  }
  :nth-child(2) {
    margin: 0 15px
  }
`
const Input = styled.input`
  background: transparent
  border-top: 0
  border-right: 0
  border-left: 0
  border-bottom: 1px solid white
  color: white
  width: 15%
  font-size: 1rem
  :focus {
    outline: none
  }
  :nth-child(4) {
    margin-left: 15px
    width: 60%
  }
`
