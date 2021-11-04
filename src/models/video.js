const db = require('../helpers/DatabaseHelper');
const { T_VIDEO } = require('../utils/Constants');

const deleteVideo = (id) => {
    return db(T_VIDEO).del()
    .where('id', '=', id)
    .returning('*');
}


const updateVideo = (id, title, path) => {
    return db(T_VIDEO)
    .update({
        title:title,
        path:path
    })
    .where('id', '=', id)
    .returning('*');
}

module.exports = {deleteVideo, updateVideo};