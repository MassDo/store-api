const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String, 
        require:[true, 'product name must be provide']
    },
    price:{
        type:Number, 
        require:[true, 'product price must be provide']
    },
    feature:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea', 'liddy', 'caressa', 'marcos'],
            message:'{VALUE} is not supported'
        }
    }
})

module.exports = mongoose.model('Product', productSchema)