import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { database } from '../firebase'
import PosBtnList from '../components/PosBtnList'
import NegBtnList from '../components/NegBtnList'
import Icon from '../components/Icon'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positive: true,
      user: null
    }
  }
  componentDidMount() {
    database
      .collection('users')
      .doc(this.props.match.params.id)
      .onSnapshot(res => this.setState({ user: { ...res.data(), id: res.id } }))
  }
  handleTogglePos = bool => this.setState({ positive: bool })
  handleLoading = () => <h2>Loading...</h2>
  render() {
    // If a profile is for a student:
    return (
      <Container>
        <View>
          <Header>
            <CstmLink to='/dashboard'>
              <Icon icon='arrow_back' />
            </CstmLink>
            <h3>Profile</h3>
          </Header>
          <Body>
            {!this.state.user ? (
              this.handleLoading()
            ) : (
              <React.Fragment>
                <Name>{this.state.user.name}</Name>
                <Id>{this.state.user.id}</Id>
                <Item>Balance: {this.state.user.balance}</Item>
                <Item>{this.state.user.email}</Item>
                <BtnPanel>
                  <Btn
                    onClick={() => this.handleTogglePos(true)}
                    className={this.state.positive && 'active'}
                  >
                    Positive
                  </Btn>
                  <Btn
                    onClick={() => this.handleTogglePos(false)}
                    className={!this.state.positive && 'active'}
                  >
                    Needs Improvement
                  </Btn>
                </BtnPanel>
                {this.state.positive ? (
                  <PosBtnList
                    id={this.state.user.id}
                    history={this.props.history}
                  />
                ) : (
                  <NegBtnList
                    id={this.state.user.id}
                    history={this.props.history}
                  />
                )}
              </React.Fragment>
            )}
          </Body>
        </View>
      </Container>
    )
  }
}

export default Profile

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
const Body = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  height: 86vh
  overflow: auto;
  padding: 1vh 2vw;
  text-align: center;
  width: 75%;
`
const Name = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  line-height: 100%;
  margin: 5px 0 10px 0;
`
const Id = styled.p`
  font-size: 0.75rem;
  font-weight: normal;
  font-style: italic;
  color: #aaa;
  margin: 0;
`
const Item = styled.p`
  margin: 10px 0;
  font-size: 1.5rem;
`
const BtnPanel = styled.div`
  display: flex;
  width: 40%;
  margin: 20px auto 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const Btn = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  font-weight: bold;
  padding: 15px;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  :hover {
    background: #444;
  }
  :nth-child(1) {
    margin-right: 15px;
  }
  &.active {
    background: #444;
  }
`
