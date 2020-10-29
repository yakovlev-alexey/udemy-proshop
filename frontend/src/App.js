import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'

import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import OrderScreen from './screens/OrderScreen'
import ProfileScreen from './screens/ProfileScreen'
import PaymentScreen from './screens/PaymentScreen'
import ProductScreen from './screens/ProductScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import ProductListScreen from './screens/ProductListScreen'

import './bootstrap.min.css'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/admin/users" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/products" component={ProductListScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route exact path="/" component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
