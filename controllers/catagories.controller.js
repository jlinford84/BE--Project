const { selectCatagories } = require('../models/catagories.model')

exports.getCatagories = (req, res) => {
    // const {
    //     query: { 'insert query' },
    // } = req;

    selectCatagories()
    .then((catagories) => {
        res.status(200).send(catagories);
    })
    .catch((err) => {
        console.log(err)
    });
};