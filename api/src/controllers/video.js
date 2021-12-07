const video = require('../models/video');
const company = require('../models/company')

const fs = require('fs');
const Helpers = require('../helpers/UploadHelper');
const { UPLOAD_PATH } = require('../config/config');


/**
 * Get all videos
 * @param {*} req
 * @param {*} res
 */
exports.all = async (req, res) => {
    video
        .findAll()
        .then((videos) => {
            res.status(200).send({
                count: videos.length,
                videos,
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}

/**
 * Find a movie by identifier
 * @param {*} req
 * @param {*} res
 */
 exports.findById = async (req, res) => {
    const { id } = req.params;
    video.findById(id).then(data => {
      if(data.length == 0){
        res.status(404).send({
          message:"Video does not exist !"
        })
      }else{
        res.status(200).send({
          video:data[0]
        })
      }
    }) 
    .catch((err) => {
      res.status(500).send(err);
    })
  }
  



/**
 * Save a video
 * @param {*} req
 * @param {*} res
 */
exports.add = async (req, res) => {
    const {title, id_company} = req.body;
    if(!title || !id_company){
        return res.status(400).send({ message: "Bad request" });
    }  

    if (req.files) {
        let file = req.files.file;
        if (!Helpers.allowedFormat(file.mimetype)) {
            return res.status(403).send({ message: "Only video format files are accepted." });
        }
        let filename = file.name;

        let path = `.${UPLOAD_PATH}/${new Date().getTime()}_${filename}`;
        video.save(title, path, id_company)
            .then(data => {
                file.mv(path, (err) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(201).send({
                            message: `The file '${filename}' has been saved.`
                        })
                    }
                });
            }).catch(err => {
                //The code 23503 means foreign_key_violation
                //See https://www.postgresql.org/docs/9.4/errcodes-appendix.html
                if(err.code == 23503){
                    res.status(404).send({ message: "Company does not exist" })
                }else{
                    res.status(500).send(err)
                }
            })
    } else {
        return res.status(400).send({ message: "No video file is uploaded." });
    }
}


/**
 * Update a video
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    if(!title){
        return res.status(400).send({ message: "Bad request" });
    }
    if (req.files) {
        let file = req.files.file;
        if (!Helpers.allowedFormat(file.mimetype)) {
            return res.status(403).send({ message: "Only video format files are accepted." });
        }
        let filename = file.name;

        video.findById(id).then(data => {
            if (data.length == 0) {
                return res.status(404).send({
                    message: "Video does not exist."
                });
            } else {
                let pathToRemove = data[0].path;
                fs.unlink(pathToRemove, (err) => {
                    let path = `.${UPLOAD_PATH}/${new Date().getTime()}_${filename}`;
                    video.update(id, title, path)
                        .then(data => {
                            file.mv(path, (err) => {
                                if (err) {
                                    res.status(500).send(err);
                                } else {
                                    res.status(201).send({
                                        message: `The file '${filename}' has been uploaded.`
                                    })
                                }
                            });
                        }).catch(err => {
                             //The code 23503 means foreign_key_violation
                             //See https://www.postgresql.org/docs/9.4/errcodes-appendix.html
                            if(err.code == 23503){
                                res.status(404).send({ message: "Company does not exist" })
                            }else{
                                res.status(500).send(err)
                            }
                        })
                });
            }
        }).catch(err => {
            res.status(500).send(err)
        });


    } else {
        return res.status(400).send({ message: "No video file is uploaded." });
    }
}

/**
 * Delete a video
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
    const { id } = req.params;
    video.remove(id).then(data => {
        if (data.length != 0) {
            fs.unlink(data[0].path, (err) => {
                res.status(200).send({
                    message: "Video deleted."
                });
            });

        } else {
            res.status(404).send({
                message: "Video does not exist."
            })
        }

    }).catch((err) => {
        return res.status(500).send(err)
    })

}
