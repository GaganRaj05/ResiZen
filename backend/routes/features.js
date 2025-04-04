const express = require('express');
const {getUsers,deleteUser} = require("../controllers/admin");
const {uploadLand,getLands,deleteLand,getSpecificLand} = require("../controllers/landFeatures");
const {handleGettingProperties,handlePostingProperties,handleDeletingProperties,handleParticularProperties,getSpecificProperty,submitInterest} = require("../controllers/features");
const router = express.Router();
const upload = require('../config/multerConfig');
const checkAuth = require("../middlewares/checkAuth");
router.get("/properties",handleGettingProperties);
router.post("/upload-property",checkAuth,upload.array("image",6),handlePostingProperties);
router.delete("/delete-property/:id",checkAuth,handleDeletingProperties);
router.get("/lands-for-sale",getLands);
router.post("/upload-land",checkAuth,upload.array("image",6),uploadLand);
router.delete("/delete-land/:id",checkAuth,deleteLand);
router.get("/properties/:propertyType",handleParticularProperties);
router.get("/lands/:land_id",checkAuth,getSpecificLand);
router.get("/property/:property_id",checkAuth,getSpecificProperty);
router.get("/admin-get-users",checkAuth,getUsers)
router.delete("/admin-delete-user/:user_id",checkAuth,deleteUser);
router.post("/submit-interest/:id",checkAuth,submitInterest);

module.exports = router;
