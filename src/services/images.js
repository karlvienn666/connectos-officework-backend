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

const findImages = (offset, limit, query) => {
    const imagesCollection = datastore.images;


    const regex = new RegExp(query, 'i');

    return new Promise((resolve, reject) => {
        imagesCollection.find({name: {$regex: regex}})
        .skip(offset)
        .limit(limit)
        .exec((err, docs) => {
            if (err) return reject(err);
            resolve(docs);
        });
    });
};

const deleteImages = (id) => {

    const imagesCollection = datastore.images;

    return new Promise((resolve, reject) => {
        imagesCollection.remove({_id: id}, (err, removed) => {
            if (err)
               return reject(err)

            resolve(id)
        });
    });
}

module.exports = {
    insertImages,
    findImages,
    deleteImages
};