const getProducts = async (req, res) =>{
    res.status(200).json({msg:'test all products'})
}
const getProductsStatic = async (req, res) =>{
    res.status(200).json({msg:'test all products statics'})
}
module.exports = {
    getProducts,
    getProductsStatic
}