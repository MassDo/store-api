const Product = require('../models/product')

const getProducts = async (req, res) =>{
    const products = await Product.find({price:42})
    res.status(200).json({products, nbHits: products.length})
}
const getProductsStatic = async (req, res) =>{
    const products = await Product.find({price:42})
    res.status(200).json({products, nbHits: products.length})
}
module.exports = {
    getProducts,
    getProductsStatic
}