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
}

export default new Party();
