import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AttendenceToggle } from './AttendenceToggle'
import { database } from '../firebase'

const UserSummary = (props) => {
  const handleToggleAttendence = (e) => {
    if (props.user.id.includes('Class')) {
      e.preventDefault()
    } else {
      database.collection('users').doc(props.user.id).update({ active: !props.user.active })
    }
  }
  const handlePrevent = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <CustomLink onClick={handlePrevent} to={`profile/${props.user.id}`}>
      <User data-id={props.user.id}>
        {props.user.id.includes('Class') ? (
          <Initials>{props.user.name.split(' ')[0]}</Initials>
        ) : (
          <AttendenceToggle
            checked={props.user.active}
            onToggle={handleToggleAttendence}
            styles={{
              component: {
                background: 'transparent',
                borderColor: 'transparent',
                ':focus': {
                  outline: 'none',
                },
              },
              trueTrack: {
                backgroundColor: 'green',
              },
              falseTrack: {
                backgroundColor: 'red',
              },
            }}
          />
        )}
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
  width: 30%;
  @media (max-width: 768px) {
    width: 45%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`
const Initials = styled.h1`
  font-size: 2rem;
  margin: auto 20px;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-right: 15px;
  }
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
