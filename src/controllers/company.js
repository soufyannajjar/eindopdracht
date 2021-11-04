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
      return res.status(200).send({
        count: companies.length,
        companies,
      })
    })
    .catch((err) => {
      return res.status(500).send(err)
    })
}

/**
 * Update a video
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
  res.status(200).send({ Company: 'Update' })
}

/**
 * Delete a video
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
  res.status(200).send({ Company: 'Delete' })
}
