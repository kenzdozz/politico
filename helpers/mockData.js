const parties = [{
  id: 1,
  name: 'People Democratic Party',
  acronym: 'PDP',
  hqAddress: 'Behind Aso Rock, Abuja',
  logoUrl: '/base/64',
  logo: 'base64',
},
{
  id: 2,
  name: 'All Progressive Congress',
  acronym: 'APC',
  hqAddress: 'Behind Aso Rock, Abuja',
  logoUrl: '/base/64',
  logo: 'base64',
},
{
  id: 3,
  name: 'Labour Party',
  acronym: 'LP',
  hqAddress: 'Behind Aso Rock, Abuja',
  logoUrl: '/base/64',
  logo: 'base64',
}];

const offices = [{
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
}];

const users = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    othername: '',
    email: 'john@doe.com',
    phoneNumber: '0704523145',
    passportUrl: 'jijijij',
    passport: 'base64',
    password: 'doe123456',
    isAdmin: false,
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Doe',
    othername: '',
    email: 'jane@doe.com',
    phoneNumber: '0704523145',
    passportUrl: 'jijijij',
    passport: 'base64',
    isAdmin: false,
  },
  {
    id: 3,
    firstname: 'Jone',
    lastname: 'Doe',
    othername: '',
    email: 'jone@doe.com',
    phoneNumber: '0704523145',
    passportUrl: 'jijijij',
    passport: 'base64',
    isAdmin: false,
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
