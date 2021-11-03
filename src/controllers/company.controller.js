/**
 * Get all companies
 * @param {*} req 
 * @param {*} res 
 */
exports.all = async(req, res) => {
    res.status(200).send({ "Company":"ALL" })
}

/**
 * Update a video
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async(req, res) => {
    res.status(200).send({ "Company":"Update" })
}

/**
 * Delete a video
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async(req, res) => {
    res.status(200).send({ "Company":"Delete" })
}