const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    offering_price:{
        type:String,
        required:true,
    },
    land_size: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true,
    },
    complete_address: {
        type:String,
        required:true
    },
    image:{
        type:[String],
        required:true
    },
    propertyType:{
        type:String,
        required:true,
    },
    district: {
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true
    }
})

const Property = mongoose.model("properties",propertySchema);

module.exports = Property;