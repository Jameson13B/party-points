import React from 'react'
import styled from 'styled-components'

const Icon = props => {
  return (
    <I className={props.className} onClick={props.onClick}>
      {props.icon}
    </I>
  )
}

export default Icon

const I = styled.i`
  font-family: 'Material Icons';
  font-size: 2em;
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2)
      format('woff2');
  }
`
