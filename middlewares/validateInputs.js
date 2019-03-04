/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import codes from '../helpers/statusCode';
import Response from '../helpers/Response';
import Models from '../database/models';

const validateInputs = rules => async (req, res, next) => {
  const { body } = req;
  const errors = {};
  let conflict = false;

  for (const rule of rules) {
    let isValid = true;
    let bodyParam = body[rule.name] ? body[rule.name] : '';
    if (typeof bodyParam === 'string') bodyParam = bodyParam.trim();
    if (rule.rule === 'required') {
      isValid = !!bodyParam;
    } else if (rule.rule === 'unique' && bodyParam) {
      isValid = !(await Models[rule.model].exists(rule.name, bodyParam));
    } else if (rule.rule === 'email') {
      isValid = /^[\w._]+@[\w]+[-.]?[\w]+\.[\w]+$/.test(bodyParam);
    } else if (rule.rule === 'number') {
      isValid = !Number.isNaN(parseInt(bodyParam, 10));
    } else if (rule.rule === 'image') {
      isValid = !!bodyParam && bodyParam !== 'invalid';
    } else if (rule.rule === 'minlen') {
      isValid = bodyParam.length >= rule.value;
    } else if (rule.rule === 'maxlen') {
      isValid = bodyParam.length <= rule.value;
    }

    if (!isValid) {
      if (rule.rule === 'unique') conflict = true;
      errors[rule.name] = rule.message;
    }
  }

  if (Object.keys(errors).length) {
    return Response.send(res, conflict ? codes.conflict : codes.badRequest, {
      error: 'Validation errors.',
      fields: errors,
    });
  }

  return next();
};

export default validateInputs;
