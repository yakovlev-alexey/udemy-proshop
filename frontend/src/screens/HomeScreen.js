import React, { useEffect, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword?.toLowerCase()

  const dispatch = useDispatch()

  const { loading, error, products } = useSelector((state) => state.productList)

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const filteredProducts = useMemo(
    () =>
      !loading && keyword
        ? products.filter(
            ({ name, brand, category, description }) =>
              name.toLowerCase().includes(keyword) ||
              brand.toLowerCase().includes(keyword) ||
              category.toLowerCase().includes(keyword) ||
              description.toLowerCase().includes(keyword)
          )
        : products,
    [keyword, products, loading]
  )

  return (
    <React.Fragment>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </React.Fragment>
  )
}

export default HomeScreen
