const getProducts = (req, res) =>{
    res.status(200).json({msg:'test all products'})
}
const getProductsStatic = (req, res) =>{
    res.status(200).json({msg:'test all products statics'})
}
module.exports = {
    getProducts,
    getProductsStatic
}