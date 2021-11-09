const company = require('./../models/company')
const video = require('../models/video')
const fs = require('fs');
const Helpers = require('../helpers/UploadHelper');

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
        if(!Helpers.allowedFormat(file.mimetype)){
            return res.status(403).send({message:"Only video format files are accepted."});
        }
        let filename = file.name;

        video.findById(id).then(data => {
            if(data.length == 0){
                return res.status(404).send({
                    message:"Video does not exist."
                });
            }else{
                let pathToRemove = data[0].path;
                fs.unlink(pathToRemove, (err)=> {
                    let path = `./uploads/${new Date().getTime()}_${filename}`;
                        video.update(id, title, path)
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
                });
            }
        }).catch(err=> {
            res.status(500).send(err)
        });
        
        
    }else{
        return res.status(400).send({message:"No video file is uploaded."});
    }
}

/**
 * Delete a video
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
  const {id} = req.params;
  video.remove(id).then(data => {
    if(data.length != 0){
        fs.unlink(data[0].path, (err) => {
            res.status(200).send({
                message:"Video deleted."
            }); 
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
