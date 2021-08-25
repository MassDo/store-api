const express = require('express')
const router = express.Router()
const {getProducts, getProductsStatic} = require('../controllers/products')
//  extend route /api/v1/products

router.route('/').get(getProducts)
router.route('/static').get(getProductsStatic)

module.exports = router