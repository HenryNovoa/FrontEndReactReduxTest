import React from 'react'
import './App.sass'
import Header from './components/Header'
import Form from './components/Form'
import List from './components/List'

function App() {
  return (
    <>
    <Header>
      <Form/>
    </Header>
    <List/>
    </>
  )
}

export default App
