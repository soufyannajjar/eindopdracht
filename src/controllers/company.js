const company = require('./../models/company')
const video = require('../models/video')
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
      res.status(500).send(err)
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
  const {id} = req.params;
  video.deleteVideo(id).then(data => {
    if(data){
        res.status(200).send({
            message:"Video deleted"
        })
    }else{
        res.status(404).send({
            message:"Video does not exist !"
        })
    }
    
  }).catch((err) => {
    return res.status(500).send(err)
  })
  
}
