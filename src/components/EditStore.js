import React, { Component } from 'react'
import styled from 'styled-components'
// import { database } from '../firebase'

class EditStore extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Container>
        <h1>Edit Store Here</h1>
      </Container>
    )
  }
}

export default EditStore

const Container = styled.div`
  padding: 10px 0;
  display: flex;
  height: 70vh;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`
