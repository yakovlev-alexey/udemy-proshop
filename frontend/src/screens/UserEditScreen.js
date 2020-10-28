import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_RESET } from '../constants/userContants'

const UserEditScreen = ({ match, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const { loading, error, user } = useSelector((state) => state.userDetails)

  const { loading: updateLoading, success, error: updateError } = useSelector((state) => state.userUpdate)

  useEffect(() => {
    if (!user || user._id !== match.params.id) {
      dispatch({ type: USER_UPDATE_RESET })
      dispatch(getUserDetails(match.params.id))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [match.params.id, user, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser(match.params.id, { name, email, isAdmin }))
  }

  return (
    <React.Fragment>
      <Link to="/admin/users" className="btn btn-light mt-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Update User Info</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {updateError && <Message variant="danger">{updateError}</Message>}
            {success && <Message variant="success">User info updated successfully</Message>}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}

        {updateLoading && <Loader />}
      </FormContainer>
    </React.Fragment>
  )
}

export default UserEditScreen
