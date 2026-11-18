import { useEffect, useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm.jsx';
import TaskFilters from './components/TaskFilters.jsx';
import TaskList from './components/TaskList.jsx'; //TaskList ja importa o TaskItem

const API_URL = 'http://localhost:3000/tasks';

function App() {
  const [titulo, setTitulo] = useState('');
  const [tasks, setTasks] = useState([]); {/*tasks guarda a lista recebida do back*/}
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState("todas");
  const [busca, setBusca] = useState("");

  async function buscarTasks() {
    try {
      setCarregando(true);
      const resposta = await fetch(API_URL); 
      if (!resposta.ok) {
        throw new Error('Não foi possível buscar as tarefas');
      }
      const dados = await resposta.json();
      setTasks(dados);
    } catch (erro) {
      setMensagem(erro.message);
    } finally {
      setCarregando(false);
    }
  }
  useEffect(() => {buscarTasks()}, []);
  async function handleSubmit(event) {
    event.preventDefault();
    if (titulo.trim() === '') {
      setMensagem('Digite uma tarefa válida');
      return;
    }
    try {
      setMensagem('');
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: titulo.trim(),
        }),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.mensagem || 'Não foi possivel adicionar a tarefa');
      }
      setTasks((tasksAtuais) => [...tasksAtuais, dados]);
      setTitulo('');
      setMensagem('Tarefa adicionado com Sucesso!');
    } catch (erro) {
      setMensagem(erro.message);
    }
  }
  async function alterarStatus(task) {
    try {
      setMensagem("");
      const resposta = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          concluida: !task.concluida,
        }),
      });
      const taskAtualizada = await resposta.json();
      if (!resposta.ok) {
        throw new Error(taskAtualizada.mensagem || "Não foi possível atualizar a tarefa");
      }
      setTasks((tasksAtuais) =>
        tasksAtuais.map((taskAtual) =>
          taskAtual.id === taskAtualizada.id
            ? taskAtualizada
            : taskAtual
        )
      );
    } catch (erro) {
      setMensagem(erro.message);
    }
  }
  async function excluirTask(task){
    const confirmou = window.confirm(
      `Deseja excluir a tarefa "${task.titulo}"?`
    );
    if (!confirmou) {
      return;
    }
    try {
      setMensagem("");
      const resposta = await fetch(`${API_URL}/${task.id}`, {
        method: "DELETE",
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(
          dados.mensagem || "Não foi possivel excluir a tarefa"
        );
      }
      setTasks((tasksAtuais) => 
        tasksAtuais.filter(
          (taskAtual) => taskAtual.id !== task.id
        )
      );
      setMensagem("Tarefa excluída com sucesso");
    } catch {
      setMensagem("Não foi possivel excluir a tarefa")
    }
  }
  async function editarTask(task) {
    const novoTitulo = window.prompt(
      "Digite o novo título da sua tarefa",
      task.titulo
    );
    if (novoTitulo === null) {
      return;
    }
    if (novoTitulo.trim() === "") {
      setMensagem("O título não pode ficar vazio");
      return;
    }
    if (novoTitulo.trim() === task.titulo) {
      return;
    }
    try {
      setMensagem("");
      const resposta = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          titulo: novoTitulo.trim(),
        }),
      });
      const taskAtualizada = await resposta.json();
      if (!resposta.ok) {
        throw new Error();
      }
      setTasks((tasksAtuais) => 
        tasksAtuais.map((taskAtual) => 
          taskAtual.id === taskAtualizada.id
            ? taskAtualizada
            : taskAtual
        )
      );
      setMensagem("Tarefa editada com sucesso!");
    } catch {
      setMensagem("Não foi possível editar a tarefa")
    }
  }
  const tasksFiltradas = tasks.filter((task) => {
    const correspondeAosStatus =
      filtro === "todas" ||
      (filtro === "pendentes" && !task.concluida) ||
      (filtro === "concluidas" && task.concluida);
    const correspondeAoTitulo = task.titulo
      .toLowerCase()
      .includes(busca.trim().toLocaleLowerCase());
    return correspondeAosStatus && correspondeAoTitulo;
  });
  return ( //transformamos em componentes
    <main className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>Lista de Tarefas</h1>
          <p>Organize suas atividades de maneira simples</p>
        </header>
        <TaskForm
          titulo={titulo}
          setTitulo={setTitulo}
          handleSubmit={handleSubmit}
        />
        <TaskFilters
          busca={busca}
          setBusca={setBusca}
          filtro={filtro}
          setFiltro={setFiltro}
        />
        {mensagem && (<p className="mensagem" role="status">{mensagem}</p>)}
        <TaskList
          tasks={tasksFiltradas}
          carregando={carregando}
          alterarStatus={alterarStatus}
          editarTask={editarTask}
          excluirTask={excluirTask}
        />
      </div>
    </main>
  );
}
export default App;
