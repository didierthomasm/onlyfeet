const express = require("express");
const upload = require("../controllers/upload.js").upload;


const router = express.Router();

router.post("/", upload);

module.exports = router;
