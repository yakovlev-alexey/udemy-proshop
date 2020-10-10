const express = require('express')

const app = express()
const port = 5000

const products = require('./data/products')

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(({ _id }) => _id === req.params.id)
  res.json(product)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
