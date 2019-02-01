/* eslint-disable no-plusplus */
import { dbQuery } from '..';

class Model {
  constructor(table) {
    this.table = table;
  }

  async create(columns, values) {
    let text = `INSERT INTO ${this.table} (${[...columns]}) VALUES (`;
    for (let index = 1; index <= values.length; index++) {
      text += index < values.length ? ` $${index},` : ` $${index}`;
    }
    text += ') RETURNING id';

    const query = {
      text,
      values,
    };
    const result = await dbQuery(query);
    return this.findOne(result[0].id);
  }

  async findOne(id) {
    const query = {
      text: `SELECT * FROM ${this.table} WHERE id = $1`,
      values: [id],
    };

    const results = await dbQuery(query);
    return results[0];
  }
}

export default Model;
