import TaskItem from './TaskItem.jsx';

function TaskList({
  tasks,
  carregando,
  alterarStatus,
  editarTask,
  excluirTask,
}) {
  return(
    <section aria-labelledby="titulo-lista">
      <h2 id="titulo-lista">Minhas tarefas</h2>
      {carregando ? (
        <p>Carregando tarefas...</p>
      ) : tasks.length === 0 ? (
        <p>Nenhum tarefa encontrada</p>
      ) : ( 
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              alterarStatus={alterarStatus}
              editarTask={editarTask}
              excluirTask={excluirTask}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
export default TaskList;