const {randomUUID} = require("crypto"); //id será um identicador único, não apenas um número
const {getTasks: getTasksFromFile, saveTasks} = require("../models/tasksModel");

function getTasks(req, res) {
  const tasks = getTasksFromFile();
  const { concluida, titulo } = req.query;
  let resultado = tasks;
  if (concluida !== undefined) {
    resultado = resultado.filter(
      (task) => String(task.concluida) === concluida
    );
  }
  if (titulo) {
    resultado = resultado.filter((task) =>
      task.titulo
        .toLowerCase()
        .includes(titulo.toLowerCase())
    );
  }
  res.json(resultado);
}

function getTaskById(req, res) {
  const tasks = getTasksFromFile();
  const id = req.params.id;

  console.log("ID recebido:", id);
  console.log("Tarefas carregadas:", tasks);

  const task = tasks.find(
    (task) => String(task.id) === String(id) //procura a task pelo id que passou a ser texto devido ao randomUUID
  );
  if (!task) {
    return res.status(404).json({
      mensagem: "Tarefa não encontrada",
    });
  }
  return res.status(200).json(task);
}

function createTask(req, res) {
  const tasks = getTasksFromFile();
  const novaTask = {
    id: randomUUID(),
    titulo: req.body.titulo.trim(), //trim() ajusta para o texto padrão
    concluida: false,
  };
  tasks.push(novaTask);
  saveTasks(tasks);
  res.status(201).json(novaTask);
}

function deleteTask(req, res) {
  const tasks = getTasksFromFile();
  const id = req.params.id;
  const indice = tasks.findIndex((task) => String(task.id) === id);
  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Tarefa não encontrada"
    });
  }
  tasks.splice(indice, 1);
  saveTasks(tasks);
  res.json({
    mensagem: "Tarefa removida com sucesso"
  });
}

function updateTask(req, res) {
  const tasks = getTasksFromFile();
  const id = req.params.id;
  const task = tasks.find((task) => String(task.id) === id);
  if (!task) {
    return res.status(404).json({
      mensagem: "Tarefa não encontrada",
    });
  }
  const {titulo, concluida} = req.body;
  if (titulo!== undefined) { 
    task.titulo = titulo.trim();
  }
  if (concluida !== undefined) { //!== com isso, tanto o true ou o false são aceitos
    task.concluida = concluida;
  }
  saveTasks(tasks);
  res.json(task);
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
};