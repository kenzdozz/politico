import codes from './statusCode';

class Response {
  static send(res, status, data) {
    res.status(status).send({
      status,
      ...data,
    });
  }

  static handleError(res, error = {}) {
    if (error.code === '23505') {
      const err = error.constraint === 'votes_createdby_office_key' ? 'You have already voted for this office.' : error.detail.replace(/\(|\)|Key /g, '').replace('=', ': ');
      return Response.send(res, codes.conflict, {
        error: err,
      });
    }
    // eslint-disable-next-line no-console
    console.log(error);
    return Response.send(res, codes.serverError, {
      error: 'Internal server error',
    });
  }
}

export default Response;
