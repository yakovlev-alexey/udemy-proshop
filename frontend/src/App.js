import React from 'react'

import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'

import './bootstrap.min.css'

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default App
