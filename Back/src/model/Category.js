const mongoose = require('../config/database');

const CategorySchema = new mongoose.Schema(
    {
        code: { type: Number },
        description: { type: String }
    }
);
module.exports = mongoose.model('Category', CategorySchema);