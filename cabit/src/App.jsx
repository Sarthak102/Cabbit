import React from 'react'
import Login from './components/Login'
import Index from './components/home/Index'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './components/home/Create';
import { Register } from './components/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/index" element={<Index />} />
        <Route path='/create' element={<Create />} />
      </Routes>
    </Router>
  )
}

export default App