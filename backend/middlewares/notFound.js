function notFound(req, res) {
  res.status(404).json({
    mensagem: `Rota ${req.method} ${req.originalUrl} não encontrado`,
  });
}
module.exports = notFound;

//req.method mostra o método utilizado (gest, post, put and delete)
//req.originalUrl mostra o enderço acessado
//ex.: "mensagem": "Rota GET /usuarios não encontrada"