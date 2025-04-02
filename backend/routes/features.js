const express = require('express');
const {uploadLand,getLands,deleteLand,getSpecificLand} = require("../controllers/landFeatures");
const {handleGettingProperties,handlePostingProperties,handleDeletingProperties,handleParticularProperties,getSpecificProperty} = require("../controllers/features");
const router = express.Router();
const upload = require('../config/multerConfig');
const checkAuth = require("../middlewares/checkAuth");
router.get("/properties",handleGettingProperties);
router.post("/upload-property",checkAuth,upload.array("image",6),handlePostingProperties);
router.post("/delete-property/:id",checkAuth,handleDeletingProperties);
router.get("/lands-for-sale",getLands);
router.post("/upload-land",checkAuth,upload.array("image",6),uploadLand);
router.post("/delete-land/:id",checkAuth,deleteLand);
router.get("/properties/:propertyType",handleParticularProperties);
router.get("/lands/:land_id",checkAuth,getSpecificLand);
router.get("/property/:property_id",checkAuth,getSpecificProperty);

module.exports = router;
