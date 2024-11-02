const { datastore } = require("../config/database");

const insertImages = (files) => {
    const imagesCollection = datastore.images;
    const mappedFiles = files.map(d => ({
        name: d.filename,
        url: `http://localhost:8080/images/${d.filename}`
    }));
    return new Promise((resolve, reject) => {
        imagesCollection.insert(mappedFiles, (err, newDoc) => {
            if (err) return reject(err);
            resolve(newDoc);
        });
    });
};

const findImages = () => {
    const imagesCollection = datastore.images;
    return new Promise((resolve, reject) => {
        imagesCollection.find({}, (err, docs) => {
            if (err) return reject(err);
            resolve(docs);
        });
    });
};

module.exports = {
    insertImages,
    findImages,
};