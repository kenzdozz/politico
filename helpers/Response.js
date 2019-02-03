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
      return Response.send(res, codes.conflict, {
        error: error.detail.replace(/\(|\)|Key /g, '').replace('=', ': '),
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
