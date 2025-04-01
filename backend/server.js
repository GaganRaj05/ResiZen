require("dotenv").config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectToDb = require("./config/db")
const authRoutes = require("./routes/auth");
const path = require("path");
const featureRoutes = require("./routes/features");
const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/app/auth",authRoutes);
app.use("/app/features",featureRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin"); 
    }
}));

connectToDb(process.env.MONGODB_URL);

app.listen(process.env.PORT,()=>console.log("Server started at Port",process.env.PORT));



