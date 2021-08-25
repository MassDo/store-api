require('dotenv').config()

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//  middleware
app.use(express.json())

// routes
app.get('/', (req, res)=>{
    res.send('<h1>Store api</h1><a href="/api/v1/products">products</a>')
})
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
const start = async ()=>{
    try {
        // TODO: connect to mongoDB 
        app.listen(port, ()=>{
            console.log(`Server listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}
start()