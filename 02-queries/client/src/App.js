/*
  > npm i graphql-request
    - we don't need to write headers, http methods, parse JSON...

  (1) create graphql/queries.js
  

  
*/

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Route, Routes } from 'react-router-dom'
import { isLoggedIn } from './auth'
import CompanyDetail from './components/CompanyDetail'
import LoginForm from './components/LoginForm'
import JobBoard from './components/JobBoard'
import JobDetail from './components/JobDetail'
import JobForm from './components/JobForm'
import NavBar from './components/NavBar'

function App() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(isLoggedIn)

  const handleLogin = () => {
    setLoggedIn(true)
    navigate('/')
  }

  const handleLogout = () => {
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <>
      <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
      <main className='section'>
        <Routes>
          <Route path='/' element={<JobBoard />} />
          <Route path='/companies/:companyId' element={<CompanyDetail />} />
          <Route path='/jobs/new' element={<JobForm />} />
          <Route path='/jobs/:jobId' element={<JobDetail />} />
          <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
        </Routes>
      </main>
    </>
  )
}

export default App
