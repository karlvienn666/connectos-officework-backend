
const Datastore = require('nedb');

const datastore = {};

const initDatastore = () => {

    datastore["images"] = new Datastore({filename: 'datastore/images.db', autoload: true});
    datastore["samples"] = new Datastore({filename: 'datastore/samples.db', autoload: true});

}

module.exports = {
    initDatastore,
    datastore
}

