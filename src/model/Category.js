const mongoose = require('../config/database');

const CategorySchema = new mongoose.Schema(
    {
        code: { type: Number, required: true },
        description: { type: String, required: true }
    }
);
module.exports = mongoose.model('Category', CategorySchema);