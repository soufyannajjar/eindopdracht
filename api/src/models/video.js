const db = require('../helpers/DatabaseHelper');
const { T_VIDEO } = require('../utils/Constants');

const findById = (id) => {
    return db(T_VIDEO).select("*")
    .where('id', '=', id)
}

const save = (name, email, id_company) => {
    return db(T_VIDEO).insert({
        name: name,
        email: email,
        id_company: id_company
    }).returning("*");
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

module.exports = {findById, remove, update, save};