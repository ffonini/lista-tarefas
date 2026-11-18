const fs = require("fs"); //fs faz o crud dos arquivos
const path = require("path");

const filePath = path.join(
  __dirname, 
  "../database/tasks.json"
);

function getTasksFromFile() {
  try { //tentar executar
    const data = fs.readFileSync(filePath, "utf-8");
    if (data.trim() === "") {
      return [];
    }
    return JSON.parse(data);
  } catch (error) { //executa se ocorrer um erro
    console.error("Erro ao ler tasks.json", error);
    return [];
  }  
}

function saveTasks(tasks) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(tasks, null, 2), "utf-8" //tranforma objeto em array
  );
}

module.exports = {
  getTasks: getTasksFromFile,
  saveTasks,
};