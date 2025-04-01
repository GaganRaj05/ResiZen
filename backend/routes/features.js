const express = require('express');
const {handleGettingProperties,handlePostingProperties,handleDeletingProperties} = require("../controllers/features");
const router = express.Router();
const upload = require('../config/multerConfig');
const checkAuth = require("../middlewares/checkAuth");
router.get("/properties",handleGettingProperties);
router.post("/upload-property",checkAuth,upload.array("image",6),handlePostingProperties);
router.post("/delete-property/:id",checkAuth,handleDeletingProperties);


module.exports = router;
