/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import codes from '../helpers/statusCode';
import Response from '../helpers/Response';
import Models from '../database/models';

const validateInputs = rules => async (req, res, next) => {
  const { body } = req;
  const errors = [];
  let conflict = false;
  let uniqueModel = '';

  for (const rule of rules) {
    if (errors.find(error => error[rule.name])) continue;
    let isValid = true;
    let bodyParam = body[rule.name] ? body[rule.name] : '';
    if (Number.isNaN(parseInt(bodyParam, 10))) bodyParam = bodyParam.trim();
    if (rule.rule === 'required') {
      isValid = !!bodyParam;
    } else if (rule.rule === 'unique' && bodyParam) {
      isValid = !(await Models[rule.model].exists(rule.name, bodyParam));
    } else if (rule.rule === 'email') {
      isValid = /\S+@\S+\.\S+/.test(bodyParam);
    } else if (rule.rule === 'number') {
      isValid = !Number.isNaN(parseInt(bodyParam, 10));
    } else if (rule.rule === 'image') {
      isValid = !!bodyParam && bodyParam !== 'invalid';
    }

    if (!isValid) {
      if (rule.rule === 'unique') {
        uniqueModel = rule.model;
        conflict = true;
      }
      const error = {};
      error[rule.name] = rule.message;
      errors.push(error);
    }
  }

  if (errors.length) {
    return Response.send(res, conflict ? codes.conflict : codes.badRequest, {
      error: conflict ? `${uniqueModel} already exists.` : 'Validation errors.',
      fields: errors,
    });
  }

  return next();
};

export default validateInputs;
