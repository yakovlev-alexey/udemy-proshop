import React, { useEffect } from 'react'

import * as QueryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

const HomeScreen = ({ location, match }) => {
  const keyword = match.params.keyword?.toLowerCase()
  const pageNumber = QueryString.parse(location.search).page

  const dispatch = useDispatch()

  const { loading, error, products, pages, page } = useSelector((state) => state.productList)

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <React.Fragment>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          <Row>
            {products.length === 0 ? (
              <Message>Nothing found</Message>
            ) : (
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            )}
          </Row>
          <Paginate keyword={keyword} page={page} pages={pages} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default HomeScreen
