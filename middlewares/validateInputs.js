import codes from '../helpers/statusCode';
import Response from '../helpers/Response';
import Models from '../database/models';

const validateInputs = rules => async (req, res, next) => {
  const { body } = req;
  const errors = [];
  let conflict = false;
  let uniqueModel = '';
  await rules.forEach((rule) => {
    let isValid = false;
    const bodyParam = body[rule.name] ? body[rule.name].trim() : '';
    switch (rule.rule) {
      case 'unique':
        isValid = !Models[rule.model].exists(rule.name, bodyParam);
        break;
      // case 'email':
      //   isValid = /\S+@\S+\.\S+/.test(bodyParam);
      //   break;
      // case 'min':
      //   isValid = bodyParam <= rule.value;
      //   break;
      // case 'max':
      //   isValid = bodyParam >= rule.value;
      //   break;
      // case 'number':
      //   isValid = !Number.isNaN(bodyParam);
      //   break;
      default: // required
        isValid = bodyParam.length;
        break;
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
  });
  if (errors.length) {
    return new Response(res, conflict ? codes.conflict : codes.badRequest, {
      error: conflict ? `${uniqueModel} already exists.` : 'Validation errors.',
      fields: errors,
    });
  }
  return next();
};

export default validateInputs;
