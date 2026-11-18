function errorHandler(err, req, res, next) { 
  console.error("Erro interno", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    mensagem: err.message || "Erro interno do servidor" //se der problema no sistema puxa essa mensagem
  });
}
module.exports = errorHandler;