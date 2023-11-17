const express = require("express");
const generateSignature = require("../controllers/sign-upload.js").generateSignature;

const router = express.Router();

router.get("/", generateSignature);

module.exports = router;
