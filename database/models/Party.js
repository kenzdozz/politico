import { lastId } from '../../helpers/utils';

class Party {
  constructor() {
    this.parties = [];
  }

  create(data) {
    const party = {
      id: lastId(this.parties) + 1,
      ...data,
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
    this.parties.push(party);
    return party;
  }

  exists(checkKey, checkValue = false) {
    const value = checkValue || checkKey;
    const key = checkValue ? checkKey : 'id';
    return !!this.parties.find(party => party[key] === value);
  }

  findAll() {
    return this.parties;
  }

  findOne(id) {
    return this.parties.find(party => party.id === id);
  }

  async update(id, data) {
    const party = this.findOne(id);
    if (!party) return null;
    const index = this.parties.indexOf(party);
    await Object.keys(data).forEach((key) => {
      if (data[key]) this.parties[index][key] = data[key];
    });
    this.parties[index].modifiedAt = new Date();
    return this.parties[index];
  }


  delete(id) {
    const party = this.findOne(id);
    if (!party) return null;
    const index = this.parties.indexOf(party);
    this.parties.splice(index, 1);
    return null;
  }
}

export default new Party();
