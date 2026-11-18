require("dotenv").config(); //pode usar várias portas
const express = require("express"); //biblioteca que facilita criar servidores
const cors = require("cors");

const tasksRoutes = require("./routes/tasks");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000; //id do servidor

app.use(cors()); //permite req feitas por outras origens
app.use(express.json()); //permite receber dados em json

app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "API de tarefas funcionando",
  });
});

app.use("/tasks", tasksRoutes);
app.use(notFound); //usado quando nehuma rota é encontrada
app.use(errorHandler) //deve ser sempre o último middleware

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
 