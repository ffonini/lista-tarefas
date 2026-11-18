function TaskItem({
  task,
  alterarStatus,
  editarTask,
  excluirTask,
}) {
  return (
    <li className="task-item">
      <div className="task-info">
        <span className={task.concluida ? "task-completed" : ""}>
          {task.titulo}
        </span>
        <span
          className={
            task.concluida
              ? "task-status status-completed"
              : "task-status status-pending"
          }
        >
          {task.concluida ? 'Concluída' : 'Pendente'}
        </span>
      </div>
      <div className="task-actions">
        <button className="button-status" type="button" onClick={() => alterarStatus(task)}>
          {task.concluida ? "Marcar como Pendente" : "Marcar como Concluída"}
        </button>
        <button className="button-edit" type="button" onClick={() => editarTask(task)}>
          Editar
        </button>
        <button className="button-delete" type="button" onClick={() => excluirTask(task)}>
          Excluir
        </button>
      </div>
    </li>
  );
}
export default TaskItem;