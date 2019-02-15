/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

const trimInput = (req, res, next) => {
  for (const index in req.body) {
    req.body[index] = typeof req.body[index] === 'string'
      ? req.body[index].trim() : req.body[index];
  }
  next();
};

export default trimInput;
