const imageService = require("../services/images");

exports.createImages = async (req, res) => {
    const { files } = req;
    if (!files || files.length === 0) {
        return res.status(400).json({ Error: 'No files uploaded.' });
    }
    try {
        const newDoc = await imageService.insertImages(files);
        return res.status(200).json(newDoc);
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

exports.getImages = async (req, res) => {
    try {
        const docs = await imageService.findImages();
        return res.status(200).json({ docs});
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};