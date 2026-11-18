function validateTaskUpdate(req, res, next) {
  const {titulo, concluida} = req.body;
  if (titulo === undefined && concluida === undefined) {
    return res.status(400).json({
      mensagem: "Informe o título ou o status da tarefa",
    });
  }
  if (titulo !== undefined && (typeof titulo !== "string" || titulo.trim() ==="")
  ) {
    return res.status(400).json({
      mensagem: "O título deve ser um texto válido",
    });
  }
  if (concluida !== undefined && typeof concluida !== "boolean"
  ) {
    return res.status(400).json({
      mensagem: "O campo deve ser true ou false",
    });
  }
  next();
}
module.exports = validateTaskUpdate