const { response } = require('express');
const Product = require('../model/Product');

class ProductController {
    async create(req, res) {
        const produto = new Product(req.body);
        await Product.count()
            .then(
                response => {
                    produto.code = response + 1;
                }
            )
            .catch(error => {
                produto.code = 1;
            })
        await produto.save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async list(req, res) {
        await Product.find().sort("id")
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

        await Product.findById(code)
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
        const produto = new Product(req.body);
        await produto.findByIdAndUpdate(produto._id, req.body)
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
        await Product.findByIdAndDelete(code)
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

module.exports = new ProductController();