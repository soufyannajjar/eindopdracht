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




module.exports = {findAll};