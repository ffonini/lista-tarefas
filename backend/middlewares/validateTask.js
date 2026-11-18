function validateTask(req, res, next) {
  const { titulo } = req.body;
  if (
    typeof titulo !== "string" ||
    titulo.trim() === ""
  ) {
    return res.status(400).json({
      mensagem: "O título é obrigatório",
    });
  }
  next(); //dá a continuação
}
module.exports = validateTask;