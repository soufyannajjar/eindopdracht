const db = require('../helpers/DatabaseHelper');
const { T_COMPANY } = require('../utils/Constants');


const findAll = () => db(T_COMPANY).select("*");


module.exports = {findAll};