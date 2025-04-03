const User = require( "../models/User");
async function getUsers(req,res) {
    try {
        const result = await User.find();
        const formattedResult = await result.map(user=>({
            ...user._doc,
            image:`${req.protocol}://${req.get("host")}/uploads/${user.image}`
        }));
        return res.status(201).json(formattedResult);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function deleteUser(req, res) {
    try {
        const user_id = req.params.user_id;
        console.log(user_id);
        const result = await User.deleteOne({email:user_id});
        console.log(result)
        return res.status(201).json("User deleted successfully");
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again");
    }
}
module.exports = {getUsers,deleteUser};