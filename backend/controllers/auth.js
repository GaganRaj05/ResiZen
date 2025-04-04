const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const Admin = require("../models/Admin");
async function handleLogin(req,res) {
    try {
        const {email, password} = req.body;
        const admin = await Admin.findOne({email});
        if(admin) {
            const result = await bcryptjs.compare(password,admin.password);
            if(result) {
                const token = jsonwebtoken.sign({id:admin._id},process.env.JWT_SECRET,{expiresIn:"1h"});
                res.cookie("jwt",token,{
                    httpOnly:true,
                    secure:false,
                    sameSite:"lax",
                    path:"/"
                });
        
                return res.status(201).json("Logged in Successfully as admin");
            }
            else {
                return res.status(401).json("Incorrect password entered");
            }
        }

        const user = await User.findOne({email:email});
        if(!user) return res.status(401).json("Email not found, please check your email address");

        const result = await bcryptjs.compare(password,user.password);
        if(!result) return res.status(401).json("Incorrect password");

        const token = jsonwebtoken.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.cookie("jwt",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            path:"/"
        });
        return res.status(201).json("Login Successfull");
         
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function handleRegistration(req, res) {
    try {
        const {name,email,password,phone,address} = req.body;
        const emailExists = await User.findOne({email:email});

        if(emailExists) return res.status(401).json("Email exists, Login");

        const phoneExists = await User.findOne({phone:phone});
        if(phoneExists) return res.status(401).json("Phone exists, Login");

        const hashedPassword = await bcryptjs.hash(password,await bcryptjs.genSalt(10));
        const imagePath = req.file ? req.file.path.replace(/\\/g,"/").replace(/^uploads\//,""):"default.jpg";
        await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phone,
            address:address,
            image:imagePath
        })
        return res.status(201).json("User account created successfully");
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function handleLogout(req,res) {
    try {
        res.clearCookie("jwt",{
            httpOnly:false,
            secure:false,
            sameSite:"lax",
            path:"/"
        });
        return res.status(201).json("Logout successfull")
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

module.exports = {handleLogin,handleRegistration, handleLogout};