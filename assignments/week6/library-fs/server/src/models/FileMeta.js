const mongoose = require('mongoose');


const fileMetaSchema = new mongoose.Schema({
userId: { type: String, required: true, index: true },
originalName: { type: String, required: true },
storedName: { type: String, required: true },
mimeType: { type: String, required: true },
size: { type: Number, required: true },
path: { type: String, required: true }, 
}, { timestamps: true });


module.exports = mongoose.model('FileMeta', fileMetaSchema);