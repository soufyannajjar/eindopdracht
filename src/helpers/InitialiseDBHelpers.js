const { T_COMPANY, T_VIDEO } = require("../utils/Constants");
const faker = require("faker");
module.exports = {
    initialiseTables: async function (db) {
      await db.schema.hasTable(T_COMPANY).then(async (exists) => {
        if (!exists) {
          await db.schema
            .createTable(T_COMPANY, (table) => {
              table.increments('id').primary();
              table.string('name');
              table.string('email');
              table.timestamps(true, true);
            })
            .then(async () => {
              console.log(`created table ${T_COMPANY}`);
              
              await db(T_COMPANY).insert(createFakeCompanies());
              console.log(`Data inserted in ${T_COMPANY} table`)
            })
            .catch((e) => {
              // console.error(e)
            })
        }

      });
  
  
      await db.schema.hasTable(T_VIDEO).then(async (exists) => {
        if (!exists) {
          await db.schema
            .createTable(T_VIDEO, (table) => {
              table.increments('id').primary();
              table.string('title');
              table.string('path');
              table.integer('id_company').references('id').inTable(T_COMPANY).onDelete('CASCADE');
              table.timestamps(true, true);
            })
            .then(async () => {
                console.log(`created table ${T_VIDEO}`);
                await db(T_VIDEO).insert(createFakeVideos());
                console.log(`Data inserted in ${T_VIDEO} table`)
            })
            .catch((e) => {
              // console.error(e)
            })
        }
      })
    }
    
  }

  const createFakeCompanies = () => {
    const fakeCompanies = [];
    for(let i=0; i< 10; i++){
      fakeCompanies.push({
        name:faker.name.jobArea(),
        email: faker.internet.email()
      })
    }
    return fakeCompanies;
  }

  const createFakeVideos = () =>{
    const fakeVideos = [];
    for(let i=0; i< 50; i++){
      fakeVideos.push({
        title:faker.name.title(),
        path:"assets/public/...",
        id_company: randomIntFromInterval(1, 10)
      })
    }
    return fakeVideos;
  }

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
