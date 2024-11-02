
const express = require("express");
const upload = require("../middleware/fileUpload");
const { createImages, getImages } = require("../controllers/images");
const router = express.Router();

const imagesRoutes = () => {

    console.log('Image Routes initialized Sheesh');

    router.get('/', getImages);
    router.post('/', upload.array('images', 10),createImages);

    return router;

}

module.exports = {
    imagesRoutes
}

