function validateTaskFilters(req, res, next) {
  const { concluida, titulo } = req.query;
  if (
    concluida !== undefined &&
    concluida !== "true" &&
    concluida !== "false"
  ) {
    return res.status(400).json({
      mensagem: "O filtro concluida deve ser true ou false",
    });
  }
  if (
    titulo !== undefined &&
    (typeof titulo !== "string" || titulo.trim() === "")
  ) {
    return res.status(400).json({
      mensagem: "O filtro titulo deve conter um texto válido",
    });
  }
  next();
}
module.exports = validateTaskFilters;