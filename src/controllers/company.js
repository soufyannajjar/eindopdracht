const company = require('./../models/company')
const video = require('../models/video')
const fs = require('fs');
const videoFormatAllowed = ["video/mp4"];

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
 * Update a video
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    if(req.files){
        let file = req.files.file;
        if(!videoFormatAllowed.includes(file.mimetype)){
            return res.status(403).send({message:"Only video format files are accepted."});
        }
        let filename = file.name;
        let path = `./uploads/${new Date().getTime()}_${filename}`;
        console.log(path)
        video.updateVideo(id, title, path)
        .then(data => {
            file.mv(path, (err)=>{
                if(err){
                    res.status(500).send(err);
                }else{
                    res.status(201).send({
                        message:`The file '${filename}' has been uploaded.`
                    })
                }
            });
        }).catch(err => {
            res.status(500).send(err)
        })
        
    }
}

/**
 * Delete a video
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
  const {id} = req.params;
  video.deleteVideo(id).then(data => {
    if(data.length != 0){
        fs.unlink(data[0].path, function(err) {
            // file doens't exist
            if(err && err.code == 'ENOENT') {
                res.status(404).send({
                    message:"File does not exist."
                });
            } else if (err) {
                res.status(500).send({
                    message:"Error occurred while trying to remove file"
                });
            } else {
                res.status(200).send({
                    message:"Video deleted."
                });
            }
        });
        
    }else{
        res.status(404).send({
            message:"Video does not exist."
        })
    }
    
  }).catch((err) => {
    return res.status(500).send(err)
  })
  
}
