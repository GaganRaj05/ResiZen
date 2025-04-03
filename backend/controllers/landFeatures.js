const Land = require("../models/Land");
async function uploadLand(req, res) {
    try {
        const {address,offering_price,description,district,state} = req.body;

        const imagePath = req.files ? req.files.map(file=>file.path.replace(/\\/g,"/").replace(/^uploads\//,"")):[];

        await Land.create({
            address,
            image:imagePath,
            offering_price,
            description,
            district,
            state
        });
        return res.status(201).json("Land uploaded successfully");
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function getLands(req,res) {
    try {
        const result = await Land.find();
        const formattedResult = await result.map(land=>({
            ...land._doc,
            image:land.image.map(img=>`${req.protocol}://${req.get("host")}/uploads/${img}`)
        }));
        console.log(formattedResult)
        return res.status(201).json(formattedResult);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function getSpecificLand(req,res) {
    try {
        const land_id = req.params.land_id;
        const result = await Land.findOne({_id:land_id});
        const formattedResult = await result.map(land=>({
            ...land._doc,
            image:land.image.map(img=>`${req.protocol}://${req.get('host')}/uploads/{img}`)
        }));
        return res.status(201).json(formattedResult);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}
async function deleteLand(req, res) {
    try {
        const id = req.params.id;
        await Land.findOneAndDelete({_id:id});
        return res.status(201).json("Land deleted successfully");
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

module.exports = {uploadLand,getLands,deleteLand,getSpecificLand};