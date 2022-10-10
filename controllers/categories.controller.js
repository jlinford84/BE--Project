const { selectCategories } = require('../models/categories.model')

exports.getCategories = (req, res) => {
    // const {
    //     query: { 'insert query' },
    // } = req;

    selectCategories()
    .then((categories) => {
        res.status(200).send(categories);
    })
    .catch((err) => {
        console.log(err)
    });
};