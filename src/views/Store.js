import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../components/Icon'
import PurchaseLog from '../components/PurchaseLog'
import EditStore from '../components/EditStore'

class Store extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: props.view || 'purchase-log',
    }
  }

  handleToggleView = e => this.setState({ view: e.target.getAttribute('name') })

  render() {
    return (
      <Container>
        <Header>
          <CstmLink to="/teacher-portal">
            <Icon icon="home" />
          </CstmLink>
          <h3>Store Panel</h3>
        </Header>
        <Body>
          <Nav>
            <NavBtn
              name="purchase-log"
              onClick={this.handleToggleView}
              selected={this.state.view === 'purchase-log'}
            >
              Purchase Log
            </NavBtn>
            <NavBtn
              name="edit-store"
              onClick={this.handleToggleView}
              selected={this.state.view === 'edit-store'}
            >
              Edit Store
            </NavBtn>
          </Nav>
          {this.state.view === 'purchase-log' ? <PurchaseLog /> : null}
          {this.state.view === 'edit-store' ? <EditStore /> : null}
        </Body>
      </Container>
    )
  }
}

export default Store

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
const Body = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  height: 89%;
  padding: 2vh;
  width: 75%;
`
const Nav = styled.div`
  display: flex;
  height: 10vh;
  justify-content: space-evenly;
`
const NavBtn = styled.div`
  align-items: center;
  background: ${props => (props.selected ? '#444' : null)};
  border: 1px solid white;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  display: flex;
  padding: 15px 20px;
  text-align: center;
  :hover {
    background: #444;
  }
`
