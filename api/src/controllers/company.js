const company = require('./../models/company')

/**
 * Get all companies
 * @param {*} req
 * @param {*} res
 */
exports.all = async (req, res) => {
  company
    .findAll()
    .then((companies) => {
      res.status(200).send({
        count: companies.length,
        companies,
      })
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

/**
 * Create a company
 * @param {*} req 
 * @param {*} res 
 */
exports.add = async (req, res) => {
  const { name, email } = req.body;
  company
    .save(name, email)
    .then((data) => {
      res.status(201).send({
        message: `Company ${name} is created`
      })
    }).catch(err => {
      res.status(500).send(err)
    });
}


/**
 * Delete a company
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
  const { id } = req.params;
  company.remove(id).then(data => {
    if (data.length != 0) {
      res.status(200).send({
        message: "Company deleted."
      });
    } else {
      res.status(404).send({
        message: "Company does not exist."
      })
    }
  }).catch((err) => {
    return res.status(500).send(err)
  })
}


/**
 * Update a company
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  company.findById(id).then(data => {
    if (data.length == 0) {
      return res.status(404).send({
        message: "Company does not exist."
      });
    } else {
      company.update(id, name, email)
        .then(data => {
          res.status(201).send({
            message: `The company '${name}' has been modified.`
          })
        }).catch(err => {
          res.status(500).send(err)
        })
    }
  }).catch(err => {
    res.status(500).send(err)
  });
}