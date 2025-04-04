const jsonwebtoken = require('jsonwebtoken');
async function checkAuth(req,res,next) {
    try {
        const token = req.cookies.jwt;
        
        const result = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user_id = result.id;
        if(result) next()
    }
    catch (err) {
        console.log(err.message);
        return res.status(501).json(err.message);
    }
}
module.exports = checkAuth;