const { imagesRoutes } = require("./images");
const express = require("express");

const router = express.Router();

const initRoutes = (app) => {

    
    router.use('/images', imagesRoutes());

    app.use('/api', router);

}

module.exports = {
    initRoutes
}