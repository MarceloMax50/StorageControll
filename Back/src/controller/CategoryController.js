const Category = require('../model/Category');

class CategoryController {
    async create(req, res) {
        const categoria = new Category(req.body);
        await Category.count()
            .then(
                response => {
                    categoria.code = response + 1;
                }
            )
            .catch(error => {
                categoria.code = 1;
            })
        await categoria.save()
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
        const categoria = new Category(req.body);
        await Category.findByIdAndUpdate(categoria._id, req.body)
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