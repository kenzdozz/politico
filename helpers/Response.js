class Response {
  constructor(res, status, data) {
    res.status(status).send({
      status,
      ...data,
    });
  }
}

export default Response;
