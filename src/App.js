import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Teacher from './views/Teacher'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import EditUser from './views/EditUser'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/teacher-portal' component={Teacher} />
        <Route path='/student-portal' component={Teacher} />
        <Route path='/dashboard' component={Dashboard} />
        {/* <Route path='/reporting' component={Reports} /> */}
        {/* <Route path='/store' component={Store} /> */}
        <Route path='/edit-user' component={EditUser} />
      </Switch>
    </div>
  )
}

export default App

// Edit User
//   Update - Doing - Finish cloud functions then apply to component
//   Delete
//   Password
// Reporting
// Store
