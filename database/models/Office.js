import { lastId } from '../../helpers/utils';

class Office {
  constructor() {
    this.offices = [];
  }

  create(data) {
    const office = {
      id: lastId(this.offices) + 1,
      ...data,
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
    this.offices.push(office);
    return office;
  }

  exists(checkKey, checkValue = false) {
    const value = checkValue || checkKey;
    const key = checkValue ? checkKey : 'id';
    return !!this.offices.find(office => office[key] === value);
  }

  findAll() {
    return this.offices;
  }

  findOne(id) {
    return this.offices.find(office => office.id === id);
  }
}

export default new Office();
