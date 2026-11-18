function TaskFilters({
  busca,
  setBusca,
  filtro,
  setFiltro,
}) {
  return (
    <section aria-label="Busca e filtro de tarefas">
      <div className="search-group">
        <label htmlFor="busca">Buscar Tarefa</label>
        <input
          id="busca"
          type="search"
          placeholder="Digite o título da tarefa"
          value={busca} 
          onChange={(event) => setBusca(event.target.value)}
        />
      </div>
      <div className="task-filters">
        <button type="button"
          onClick={() => setFiltro("todas")}
          aria-pressed={filtro === "todas"}
        >Todas</button>

        <button
          type="button"
          onClick={() => setFiltro("pendentes")}
          aria-pressed={filtro === "pendentes"}
        >Pendentes</button>

        <button
          type="button"
          onClick={() => setFiltro("concluidas")}
          aria-pressed={filtro === "concluidas"}
        >Concluídas</button>
      </div>
    </section>
  );
}
export default TaskFilters;