const db = require('../helpers/DatabaseHelper');
const { T_VIDEO } = require('../utils/Constants');

const findById = (id) => {
    return db(T_VIDEO).select("*")
    .where('id', '=', id)
}


const remove = (id) => {
    return db(T_VIDEO).del()
    .where('id', '=', id)
    .returning('*');
}


const update = (id, title, path) => {
    return db(T_VIDEO)
    .update({
        title:title,
        path:path
    })
    .where('id', '=', id)
    .returning('*');
}

module.exports = {findById, remove, update};