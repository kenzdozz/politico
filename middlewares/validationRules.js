
const registerRules = [
  {
    name: 'firstname',
    rule: 'required',
    message: 'First name is required.',
  },
  {
    name: 'lastname',
    rule: 'required',
    message: 'Last name is required.',
  },
  {
    name: 'email',
    rule: 'required',
    message: 'Email address is required.',
  },
  {
    name: 'email',
    rule: 'email',
    message: 'A valid email address is required.',
  },
  {
    name: 'phonenumber',
    rule: 'required',
    message: 'Phone number is required.',
  },
  {
    name: 'phonenumber',
    rule: 'number',
    message: 'Phone number must be a number.',
  },
  {
    name: 'password',
    rule: 'required',
    message: 'Password is required.',
  },
  {
    name: 'gender',
    rule: 'required',
    message: 'Gender is required.',
  },
  {
    name: 'passport',
    rule: 'required',
    message: 'Passport is required.',
  },
];

const resetPasswordRules = [
  {
    name: 'email',
    rule: 'required',
    message: 'Email address is required.',
  },
  {
    name: 'email',
    rule: 'email',
    message: 'A valid email address is required.',
  },
];

const loginRules = [
  {
    name: 'email',
    rule: 'required',
    message: 'Email address is required.',
  },
  {
    name: 'email',
    rule: 'email',
    message: 'A valid email address is required.',
  },
  {
    name: 'password',
    rule: 'required',
    message: 'Password is required.',
  },
];

const officeRules = [
  {
    name: 'name',
    rule: 'required',
    message: 'Office name is required.',
  },
  {
    name: 'name',
    rule: 'unique',
    model: 'Office',
    message: 'Office already exists.',
  },
  {
    name: 'type',
    rule: 'required',
    message: 'Office type is required.',
  },
];

const partyRules = [
  {
    name: 'name',
    rule: 'required',
    message: 'Party name is required.',
  },
  {
    name: 'name',
    rule: 'unique',
    model: 'Party',
    message: 'Party already exists.',
  },
  {
    name: 'hqAddress',
    rule: 'required',
    message: 'Headquater address is required.',
  },
  {
    name: 'logo',
    rule: 'required',
    message: 'Party logo is required.',
  },
];

export {
  registerRules, loginRules, officeRules, partyRules, resetPasswordRules,
};
