
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initDatastore, datastore } = require('./config/database');
const { initRoutes } = require('./routes');
const { serveStaticFiles } = require('./config/staticFiles');

const app = express();
const port = process.env.PORT || "8080";


const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const initServer = () => {

    initDatastore();
    serveStaticFiles(app);
    initRoutes(app);

    app.listen(port);
    console.log('Server initialized! Servering running at Port 8080');
}

initServer();