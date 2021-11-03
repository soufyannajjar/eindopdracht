
exports.all = async(req, res) => {
    res.status(200).send({ "Company":"ALL" })
}


exports.update = async(req, res) => {
    res.status(200).send({ "Company":"Update" })
}

exports.delete = async(req, res) => {
    res.status(200).send({ "Company":"Delete" })
}