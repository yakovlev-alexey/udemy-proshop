import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductEditScreen = ({ match }) => {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [image, setImage] = useState('')

  const dispatch = useDispatch()

  const { loading, error, product } = useSelector((state) => state.productDetails)

  const { loading: updateLoading, success, error: updateError } = useSelector((state) => state.productUpdate)

  useEffect(() => {
    if (!product || product._id !== match.params.id) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch(listProductDetails(match.params.id))
    } else {
      setName(product.name)
      setBrand(product.brand)
      setCategory(product.category)
      setDescription(product.description)
      setPrice(product.price)
      setCountInStock(product.countInStock)
      setImage(product.image)
    }
  }, [match.params.id, product._id, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct(match.params.id, { name, brand, category, description, price, countInStock, image }))
  }

  return (
    <React.Fragment>
      <Link to="/admin/products" className="btn btn-light mt-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Update Product Info</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {updateError && <Message variant="danger">{updateError}</Message>}
            {success && <Message variant="success">Product info updated successfully</Message>}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>CountInStock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                required
                onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                required
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
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

export default ProductEditScreen
