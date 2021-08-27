const { query } = require('express')
const Product = require('../models/product')


const getProductsStatic = async (req, res) =>{
    const products = await Product.find({price:42})
    res.status(200).json({products, nbHits: products.length})
}
const getProducts = async (req, res) =>{
    // filter for correct query fields
    const {featured, company, name, sort, fields, numericFilters} = req.query
    const queryObject = {}
    if (featured){
        queryObject.featured = featured === "true" ? true : false
    }
    if (company){
        queryObject.company = company
    }
    if (name){
        queryObject.name = {$regex:name, $options:'i'}
    }
    // numeric Filter
    if (numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte',
            '=':'$eq',
        }
        const regEx = /\b(<|<=|>|>=|=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, value] = item.split('-')
            if (options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }
    let searchResult = Product.find(queryObject)
    // select fields
    if (fields){
        const selectList = fields.split(',')
        searchResult = searchResult.select(selectList)
    }
    // sort fields
    if(sort){
        const sortStr = sort.split(',').join(' ')
        searchResult = searchResult.sort(sortStr)
    }else{
        searchResult = searchResult.sort('createdAt')
    }    
    // pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit 
    searchResult = searchResult.skip(skip).limit(limit)
    // fetch database
    const products = await searchResult
    res.status(200).json({nbHits: products.length, products })
}
module.exports = {
    getProducts,
    getProductsStatic
}