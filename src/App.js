import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Teacher from './views/Teacher'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/teacher-portal' component={Teacher} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </div>
  )
}

export default App

// Register
// Reporting
// Edit User
// Store
