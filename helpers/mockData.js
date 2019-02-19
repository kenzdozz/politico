const parties = [
  {
    name: 'People Democratic Party',
    acronym: 'PDP',
    hqaddress: 'Behind Aso Rock, Abuja',
    logo: '/base/64',
  },
  {
    acronym: 'APC',
    hqaddress: 'Behind Aso Rock, Abuja',
    logo: '/base/64',
  },
  {
    name: 'Labour Party',
    acronym: 'LP',
    hqaddress: 'Behind Aso Rock, Abuja',
    logo: '/base/64',
  },
  {
    name: 'Labour Party',
    acronym: 'LP',
    hqaddress: 'Behind Aso Rock, Abuja',
    logoUrl: '/base/64',
  },
  {
    name: 'People Democratic Party',
    acronym: 'APC',
    hqaddress: 'Behind Aso Rock, Abuja',
    logoUrl: '/base/64',
  },
];

const offices = [
  {
    type: 'federal',
    name: 'President',
  },
  {
    type: 'state',
    name: 'Governor',
  },
  {
    type: 'legislative',
    name: 'Senator',
  },
];

const users = [
  {
    firstname: 'Kenneth',
    lastname: 'Onah',
    email: 'kenzdozz@gmail.com',
    phonenumber: '07032328612',
    password: 'chidozie',
    gender: 'Male',
    passport: 'jojojdjodwjodw',
  },
  {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@doe.com',
    phonenumber: '07032878612',
    password: 'johndoe',
    gender: 'Male',
    passport: 'jojojnjbodwjodw',
  },
  {
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane@doe.com',
    phonenumber: '07032328698',
    password: 'doejane',
    gender: 'Feale',
    passporturl: 'jojojdjodwjugfytw',
  },
  {
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'janer@doe.com',
    phonenumber: '07031328698',
    password: 'doejane',
    gender: 'Feale',
    passporturl: 'jojojdjodwjugfytw',
  },
  {
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'janers@doe.com',
    phonenumber: '072031328698',
    password: 'doejane',
    gender: 'Feale',
    passporturl: 'jojojdjodwjugfytw',
  },
];

const candidates = [
  {
    id: 1,
    office: 1,
    party: 1,
    candidate: 1,
  },
  {
    id: 2,
    office: 1,
    party: 2,
    candidate: 2,
  },
];

const votes = [
  {
    id: 1,
    createdOn: new Date(),
    createdBy: 2,
    office: 1,
    candidate: 1,
  },
];

const petitions = [
  {
    id: 1,
    createdOn: new Date(),
    createdBy: 1,
    office: 1,
    body: 'The election was rigged by PDP',
  },
];

const results = [
  {
    office: 1,
    candidate: 1,
    result: 13,
  },
  {
    office: 1,
    candidate: 1,
    result: 13,
  },
];

export {
  parties, offices, users, candidates, votes, petitions, results,
};
