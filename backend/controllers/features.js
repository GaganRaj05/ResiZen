const Property = require("../models/Property");
async function handleGettingProperties(req, res) {
    try {
        const result = await Property.find();

        const formattedResult = await result.map(property=>({
            ...property._doc,
            image:property.image.map(img=>`${req.protocol}://${req.get("host")}/uploads/${img}`)
        }))
        return res.status(201).json(formattedResult);
    }
    catch(err) {
        console.log(err.message);
        res.status(501).json("Some error occured please try again later");
    }
}

async function handlePostingProperties(req, res) {
    try {
        const {name, price,land_size,description,address} = req.body;

        const imagePath = req.files ? req.files.map(file=>file.path.replace(/\\/g,"/").replace(/^uploads\//,"")):[];

        await Property.create({
            name:name,
            offering_price:price,
            land_size:land_size,
            description:description,
            image:imagePath,
            address:address
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

module.exports = {handleGettingProperties,handlePostingProperties,handleDeletingProperties};