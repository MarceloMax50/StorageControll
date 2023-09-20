const mongoose = require('../config/database');

const ProductSchema = new mongoose.Schema(
    {
        code: { type: Number },
        description: { type: String },
        category: { type: Number },
        stockquantity: { type: Number },
        minstock: { type: Number },
        active: { type: Boolean }
    }
);
module.exports = mongoose.model('Product', ProductSchema);