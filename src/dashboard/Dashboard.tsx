import * as React from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import NoMatch from '../common/component/noMatch/NoMatch'

const Dashboard = () => {
  console.log('dashboard ....')
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardIndex />} />
        <Route path="messages" element={<Messages />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

const DashboardLayout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard Home</Link>
          </li>
          <li>
            <Link to="/dashboard/messages">Messages</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  )
}

const DashboardIndex = () => {
  return (
    <div>
      <h2>Dashboard Index</h2>
    </div>
  )
}

const Messages = () => {
  return (
    <div>
      <h2>Messages</h2>
      <ul>
        <li>Message 1</li>
        <li>Message 2</li>
      </ul>
    </div>
  )
}

export default React.memo(Dashboard)
