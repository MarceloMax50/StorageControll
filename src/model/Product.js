const mongoose = require('../config/database');

const ProductSchema = new mongoose.Schema(
    {
        code: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: Number, required: true },
        stockquantity: { type: Number, required: true },
        minstock: { type: Number, required: true },
        active: { type: Boolean, required: true }
    }
);
module.exports = mongoose.model('Product', ProductSchema);