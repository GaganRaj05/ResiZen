const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
    address: {
        type:String,
        required:true,
    },
    image:{
        type:[String],
        required:true,
    },
    offering_price: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

const Land = mongoose.model("lands",landSchema);

module.exports = Land;