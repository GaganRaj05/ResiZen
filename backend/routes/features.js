const express = require('express');
const {uploadLand,getLands,deleteLand} = require("../controllers/landFeatures");
const {handleGettingProperties,handlePostingProperties,handleDeletingProperties} = require("../controllers/features");
const router = express.Router();
const upload = require('../config/multerConfig');
const checkAuth = require("../middlewares/checkAuth");
router.get("/properties",handleGettingProperties);
router.post("/upload-property",checkAuth,upload.array("image",6),handlePostingProperties);
router.post("/delete-property/:id",checkAuth,handleDeletingProperties);
router.get("/lands-for-sale",getLands);
router.post("/upload-land",checkAuth,upload.array("image",6),uploadLand);
router.post("/delete-land/:id",checkAuth,deleteLand);

module.exports = router;
