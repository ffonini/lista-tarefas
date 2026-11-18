function TaskForm({titulo, setTitulo, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="titulo">Nova tarefa</label>
      <div className="input-group">
        <input
          id="titulo"
          type="text"
          placeholder="Digite uma tarefa"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />
        <button type="submit">Adicionar</button>
      </div>
    </form>
  )
}
export default TaskForm;