import React from 'react'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/bionique' element={<MainPage />} />
      </Routes>
    </div>
  )
}

export default App