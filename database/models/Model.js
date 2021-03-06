/* eslint-disable no-plusplus */
import { dbQuery } from '..';
import { isArray } from 'util';

class Model {
  constructor(table) {
    this.table = table;
  }

  async create(data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    let text = `INSERT INTO ${this.table} (${[...columns]}) VALUES (`;
    for (let index = 1; index <= values.length; index++) {
      text += index < values.length ? ` $${index},` : ` $${index}`;
    }
    text += ') RETURNING id';

    const query = { text, values };
    const result = await dbQuery(query);
    return this.find(result[0].id);
  }

  async update(id, data) {
    if (!await this.exists(id)) return null;
    const updateData = data;
    Object.keys(updateData).forEach((key) => {
      if (data[key] === undefined || updateData[key] === '') {
        delete updateData[key];
      }
    });
    const columns = Object.keys(updateData);
    const values = Object.values(updateData);
    let text = `UPDATE ${this.table} SET`;
    for (let index = 1; index <= values.length; index++) {
      text += index < values.length ? ` ${columns[index - 1]} = $${index},` : ` ${columns[index - 1]} = $${index}`;
    }
    text += ` WHERE id = $${values.length + 1} RETURNING id`;
    values.push(id);

    const query = { text, values };
    const result = await dbQuery(query);
    return this.find(result[0].id);
  }

  async delete(id) {
    if (Number.isNaN(id)) return null;
    const query = {
      text: `DELETE FROM ${this.table} WHERE id = $1`,
      values: [id],
    };

    const results = await dbQuery(query);
    return results[0];
  }

  async find(id) {
    if (Number.isNaN(id)) return null;
    const query = {
      text: `SELECT * FROM ${this.table} WHERE id = $1`,
      values: [id],
    };

    const results = await dbQuery(query);
    return results[0];
  }

  async all() {
    const results = await dbQuery(`SELECT * FROM ${this.table}`);
    return results;
  }

  async exists(checkColumn = false, checkValue = false) {
    let query;
    if (!checkColumn && !checkValue) query = { text: `${this.text}`, values: this.values };
    else {
      const value = checkValue || (Number.isNaN(checkColumn) ? null : checkColumn);
      let column = checkValue ? checkColumn : 'id';
      let data = '$1';
      if (Number.isNaN(parseInt(value, 10))) {
        data = 'LOWER($1)';
        column = `LOWER(${column})`;
      }
      query = {
        text: `SELECT * FROM ${this.table} WHERE ${column} = ${data}`,
        values: [value],
      };
    }

    this.text = '';
    const results = await dbQuery(query);
    return !!results.length;
  }

  select(selectColumns = false) {
    const columns = selectColumns || ['*'];
    this.text = `SELECT ${[...columns]} FROM ${this.table}`;
    return this;
  }

  where(array) {
    if (!this.text) this.text = `SELECT * FROM ${this.table}`;
    this.text += ' WHERE';
    this.values = [];
    const conditions = isArray(array[0]) ? array : [array];
    let index = 0;
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i];
      if (!isArray(condition) || condition.length !== 3) {
        throw new Error('where param must be array containing column operator and value');
      }
      let column = condition[0];
      const opr = condition[1];
      let value = condition[2];
      if (column === 'id') {
        value = Number.isNaN(parseInt(value, 10)) ? null : parseInt(value, 10);
      }
      let data = `$${++index}`;
      if (Number.isNaN(parseInt(value, 10))) {
        data = `LOWER($${index})`;
        column = `LOWER(${column})`;
      }
      this.text += ` ${column} ${opr} ${data}`;
      this.values.push(value);
      if (conditions.indexOf(condition) < conditions.length - 1) this.text += ' AND';
    }
    return this;
  }

  raw(query) {
    this.text = query;
    return this;
  }

  async first() {
    const query = typeof this.text === 'object' ? this.text : {
      text: `${this.text} ORDER BY id ASC LIMIT 1`,
      values: this.values,
    };

    this.text = '';
    const results = await dbQuery(query);
    return results[0];
  }

  async get() {
    const query = typeof this.text === 'object' ? this.text : {
      text: this.text,
      values: this.values,
    };
    this.text = '';
    const results = await dbQuery(query);
    return results;
  }
}

export default Model;
