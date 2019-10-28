import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Teacher from './views/Teacher'
import Student from './views/Student'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import Profile from './views/Profile'
import Reporting from './views/Reporting'
import EditUser from './views/EditUser'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/teacher-portal' component={Teacher} />
        <Route path='/student-portal' component={Student} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/profile/:id' component={Profile} />
        <Route path='/reporting' component={Reporting} />
        {/* <Route path='/store' component={Store} /> */}
        <Route path='/edit-user' component={EditUser} />
      </Switch>
    </div>
  )
}

export default App

// Dashboard
//   Pending add points by class
// Reporting
//   Pending filter by dates
// Store
