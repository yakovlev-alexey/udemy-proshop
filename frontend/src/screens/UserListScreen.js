import React, { useEffect } from 'react'

import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import { getAllUsers } from '../actions/userActions'

import Message from '../components/Message'
import Loader from '../components/Loader'

const UserListScreen = ({ history }) => {
  const { loading, error, users } = useSelector((state) => state.userList)

  const { userInfo } = useSelector((state) => state.userLogin)

  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers())
    } else {
      history.push('/login')
    }
  }, [history, userInfo, dispatch])

  const deleteHandler = (id) => {}

  return (
    <React.Fragment>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }} />
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  )
}

export default UserListScreen
