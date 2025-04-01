require("dotenv").config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectToDb = require("./config/db")

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

connectToDb(process.env.MONGODB_URL);

app.listen(process.env.PORT,()=>console.log("Server started at Port",process.env.PORT));



