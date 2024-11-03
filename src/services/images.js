const { datastore } = require("../config/database");
const fs = require('fs');

const insertImages = (files) => {
    const imagesCollection = datastore.images;
    const mappedFiles = files.map(d => ({
        name: d.filename,
        url: `http://localhost:8080/images/${d.filename}`,
        path: d.path
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

        imagesCollection.findOne({ _id: id }, (err, doc) => {
            if (!doc) return reject(new Error('Image not found'));

            const imagePath = doc.path;

            imagesCollection.remove({_id: id}, (err, removed) => {
                if (err)
                   return reject(err)
    
                try {
                    fs.unlinkSync(imagePath);
                    console.log(`File deleted: ${imagePath}`);
                } catch (err) {
                    return reject(`Failed to delete file at ${imagePath}: ${err}`);
                }
    
                resolve(id)
            });
        })

    });
}

module.exports = {
    insertImages,
    findImages,
    deleteImages
};