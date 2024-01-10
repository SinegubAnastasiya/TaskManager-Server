function buildResponse(res, status, body) {
  res.status(status).send(body);
}

module.exports = { buildResponse };
