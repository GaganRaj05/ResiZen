const Property = require("../models/Property");
async function handleGettingProperties(req, res) {
    try {
        const result = await Property.find();

        const formattedResult = await result.map(property=>({
            ...property._doc,
            image:property.image.map(img=>`${req.protocol}://${req.get("host")}/uploads/${img}`)
        }))
        console.log("request came")
        return res.status(201).json(formattedResult);
    }
    catch(err) {
        console.log(err.message);
        res.status(501).json("Some error occured please try again later");
    }
}

async function handlePostingProperties(req, res) {
    try {
        const {name, price,land_size,description,address,propertyType,district,state} = req.body;

        const imagePath = req.files ? req.files.map(file=>file.path.replace(/\\/g,"/").replace(/^uploads\//,"")):[];

        await Property.create({
            name:name,
            offering_price:price,
            land_size:land_size,
            description:description,
            image:imagePath,
            complete_address:address,
            propertyType,
            district,
            state
        });

        return res.status(201).json("Post added successfully");
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function handleDeletingProperties(req,res) {
    try {
        const id = req.params.id;
        console.log(id)
        await Property.findOneAndDelete({_id:id});
        return res.status(201).json("Property deleted successfully");
    }   
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function handleParticularProperties(req, res) {
    try {
        const propertyType = req.params.propertyType;
        const result = await Property.find({propertyType});

        const formattedResult = await result.map(property=>({
            ...property._doc,
            image:property.image.map(img=>`${req.protocol}://${req.get("host")}/uploads/${img}`)
        }));
        return res.status(201).json(formattedResult);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}
async function getSpecificProperty(req, res) {
    try {
        const property_id = req.params.property_id;
        const result = await Property.findOne({_id:property_id});

        const formattedResult = await result.map(property=> ({
            ...property._doc,
            image:property.image.map(img=>`${req.protocol}://${req.get("host")}/uploads/${img}`)
        }));
        return res.status(201).json(formattedResult);
    }   
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

module.exports = {handleGettingProperties,handlePostingProperties,handleDeletingProperties,handleParticularProperties,getSpecificProperty};