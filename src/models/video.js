const db = require('../helpers/DatabaseHelper');
const { T_VIDEO } = require('../utils/Constants');

const deleteVideo = (id) => {
    return db(T_VIDEO).del()
    .where('id', '=', id);
}

module.exports = {deleteVideo};