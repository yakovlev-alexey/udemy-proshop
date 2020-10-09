import React from 'react'

import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'

import './bootstrap.min.css'

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to ProShop</h1>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default App
