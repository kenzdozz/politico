import bcrypt from 'bcrypt';
import { dbQuery } from '..';

class User {
  constructor() {
    this.parties = [];
  }

  static create(data) {
    const {
      firstname, lastname, othername, gender, email, password, phoneNumber, passportUrl,
    } = data;
    const passwordHash = bcrypt.hashSync(password, 10);
    const query = {
      text: 'INSERT INTO users (firstname, lastname, othername, gender, email, password, phoneNumber, passportUrl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [
        firstname, lastname, othername, gender, email, passwordHash, phoneNumber, passportUrl,
      ],
    };

    dbQuery(query);
    return User.findOne(email);
  }

  static exists(key) {
    return !!User.findOne(key);
  }

  static findAll() {
    const query = {
      text: 'SELECT * FROM users WHERE',
    };

    const results = dbQuery(query);
    return results;
  }

  static findOne(id) {
    const isEmail = Number.isNaN(parseInt(id, 10));
    const where = isEmail ? 'LOWER(users.email) = LOWER($1)' : 'users.id = $1';
    const query = {
      text: `SELECT * FROM users WHERE ${where}`,
      values: [`${id}`],
    };

    const results = dbQuery(query);
    return results[0];
  }
}

export default User;
