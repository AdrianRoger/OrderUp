require('dotenv').config();
const pg = require('pg');

class Database {
  #pool;

  constructor(){
    this.#configDatabase();
  }

  #configDatabase() {
    config();

    this.#pool = new pg.Pool({
      user : process.env.PGUSER,
      host :  process.env.PGHOST,
      database : process.env.PGDATABASE,
      password : process.env.PGPASSWORD,
      port : process.env.PGPORT,
      max: 20,
    });
  }

  async excuteQuery({query, args}) {
    const client = await this.#pool.connect();

    try{

      await client.query("BEGIN");
      const result = await client.query(query, args);
      await client.query("COMMIT");

      client.realease();
      return result.rows;

    }catch (error) {

      await client.query("ROLLBACK");
      client.realease();
      throw error;
    }
  }
}

const database = new Database();

module.exports = database;