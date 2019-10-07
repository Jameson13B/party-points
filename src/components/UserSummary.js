import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getInitials } from '../utils'

const UserSummary = props => {
  return (
    <CustomLink to={`profile/${props.user.id}`}>
      <User data-id={props.user.id}>
        <Initials>{getInitials(props.user.name)}</Initials>
        <Name>{props.user.name.substring(0, 20)}</Name>
        <Balance>{props.user.balance}</Balance>
      </User>
    </CustomLink>
  )
}

export default UserSummary

const User = styled.div`
  display: flex;
  border: 1px solid white;
  border-radius: 15px;
  padding: 15px 0;
  margin: 15px 0;
  cursor: pointer;
  line-height: 200%;
  :hover {
    background: #444;
  }
`
const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;
  width: 45%;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const Initials = styled.h1`
  font-size: 2.5rem;
  margin: auto 25px;
`
const Name = styled.h1`
  flex: 3;
  text-align: left;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
`
const Balance = styled.p`
  margin: auto 25px;
  font-size: 1rem;
`
