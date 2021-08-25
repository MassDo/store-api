require('dotenv').config()
const express = require('express')
const app = express()
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

//  middleware
app.use(express.json())

// routes
app.use('/api/v1/products', productsRouter)
app.get('/', (req, res)=>{
    res.send('<h1>Store api</h1><a href="/api/v1/products">products</a>')
})
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
const start = async ()=>{
    try {
        // TODO: connect to mongoDB 
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}
start()