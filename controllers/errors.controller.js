function handlePSQLErrors(err, req, res, next) {
    if(err.code === '22P02') {
      res.status(400).send({ msg: 'invalid type'})
    } else {
      next(err)
    }
  }

function handleCustomErrors(err, req, res, next) {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else {
      next(err);
    }
  }

function handleInternalErrors(err, req, res, next) {
    console.log(err);
    res.sendStatus(500).send({ msg: "Server issue" });
  }



  module.exports = { handlePSQLErrors, handleCustomErrors, handleInternalErrors }