const db = require('../../db');
const T_COMPANY = "companies";
const T_VIDEO= "videos";

const findAll = () => db(T_COMPANY).select("*");