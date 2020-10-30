import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Carousel, Image } from 'react-bootstrap'

import { listTopProducts } from '../actions/productActions'

import Loader from './Loader'
import Message from './Message'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const { loading, error, products } = useSelector((state) => state.productTop)

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message varaint="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Row className="justify-content-around">
              <Image src={product.image} alt={product.name} fluid />
            </Row>
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
