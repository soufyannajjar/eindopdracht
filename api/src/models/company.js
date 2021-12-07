const db = require('../helpers/DatabaseHelper');
const { T_COMPANY, T_VIDEO } = require('../utils/Constants');
const joinjs = require('join-js').default;

const resultMaps = [
    {
        mapId: 'companyMap',
        idProperty: 'id',
        properties: ['name','email'],
        collections: [
            {name: 'videos', mapId: 'videoMap', columnPrefix: 'video_'}
        ]
    },
    {
        mapId: 'videoMap',
        idProperty: 'id',
        properties: ['title','path']
    }
]

const findAll = () => {
    return db
    .select( 'co.id as company_id',
    'co.name as company_name',
    'co.email as company_email',
    'vi.id as video_id',
    'vi.title as video_title',
    'vi.path as video_path')
    .from(`${T_COMPANY} as co`)
    .leftOuterJoin(`${T_VIDEO} as vi`, 'vi.id_company','co.id')
    .orderBy("co.id","asc")
    .then((resultSet) => {
        return joinjs.map(resultSet, resultMaps, 'companyMap', 'company_');
    });
}


const findById = (id) => {
    return db
    .select( 'co.id as company_id',
    'co.name as company_name',
    'co.email as company_email',
    'vi.id as video_id',
    'vi.title as video_title',
    'vi.path as video_path')
    .from(`${T_COMPANY} as co`)
    .leftOuterJoin(`${T_VIDEO} as vi`, 'vi.id_company','co.id')
    .where('co.id', '=', id)
    .orderBy("co.id","asc")
    .then((resultSet) => {
        return joinjs.map(resultSet, resultMaps, 'companyMap', 'company_');
    });    
}

const save = (name, email) => {
    return db(T_COMPANY).insert({
        name: name,
        email: email
    }).returning("*");
}

const remove = (id) => {
    return db(T_COMPANY).del()
    .where('id', '=', id)
    .returning('*');
}



const update = (id, name, email) => {
    return db(T_COMPANY)
    .update({
        name:name,
        email:email
    })
    .where('id', '=', id)
    .returning('*');
}





module.exports = {findAll, findById, save, remove, update};