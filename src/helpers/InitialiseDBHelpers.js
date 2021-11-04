const { T_COMPANY, T_VIDEO } = require("../utils/Constants");

const func = {
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
            })
            .catch((e) => {
              // console.error(e)
            })
        }
      })
    }
  }
  
  module.exports = func;