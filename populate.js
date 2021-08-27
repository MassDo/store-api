require('dotenv').config()

const connecDB = require('./db/connect')
const Product = require('./models/product')


const jsonProducts = require('./products.json')

const start = async ()=>{
    try {
        await connecDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('success populate the dataBase Store-api')
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

start()