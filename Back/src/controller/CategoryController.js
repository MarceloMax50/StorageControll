const { response } = require('express');
const Category = require('../model/Category');
class CategoryController {
    async create(req, res) {
        const produto = new Category(req.body);
        await produto.save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async list(req, res) {
        await Category.find().sort("id")
            .then(
                response => {
                    return res.status(200).json(response);
                }
            )
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async getById(req, res) {
        const { code } = req.params;

        await Category.findById(code)
            .then(
                response => {
                    return res.status(200).json(response);
                }
            )
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        const { code } = req.params;
        const produto = req.body;
        await Category.findByIdAndUpdate(code, produto)
            .then(
                response => {
                    return res.status(200).json(response);
                }
            )
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async delete(req, res) {
        const { code } = req.params;
        await Category.findByIdAndDelete(code)
            .then(
                response => {
                    return res.status(200).json(response);
                }
            )
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new CategoryController();