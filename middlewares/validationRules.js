
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
    name: 'email',
    rule: 'unique',
    model: 'User',
    message: 'Email address already exists.',
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
    name: 'phonenumber',
    rule: 'unique',
    model: 'User',
    message: 'Phone number already exists.',
  },
  {
    name: 'phonenumber',
    rule: 'minlen',
    value: 10,
    message: 'Phone number must be within 10 to 15 characters.',
  },
  {
    name: 'phonenumber',
    rule: 'maxlen',
    value: 15,
    message: 'Phone number must be within 10 to 15 characters.',
  },
  {
    name: 'password',
    rule: 'required',
    message: 'Password is required.',
  },
  {
    name: 'password',
    rule: 'minlen',
    value: 8,
    message: 'Password length must be up to 8 characters.',
  },
  {
    name: 'gender',
    rule: 'required',
    message: 'Gender is required.',
  },
  {
    name: 'passport',
    rule: 'image',
    message: 'Passport is required - jpg or png.',
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
    name: 'hqaddress',
    rule: 'required',
    message: 'Headquater address is required.',
  },
  {
    name: 'logo',
    rule: 'image',
    message: 'Logo is required - jpg or png.',
  },
];

export {
  registerRules, loginRules, officeRules, partyRules, resetPasswordRules,
};
