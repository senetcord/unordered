import TodoItem from "./Todoitem";
import styles from "./todolist.module.css";

function TodoList({ todos, setTodos }) {
  const sortedTodos = [...todos].sort(
    (a, b) => Number(a.done) - Number(b.done)
  );
  return (
    <div className={styles.list}>
      {sortedTodos.map((item) => (
        <TodoItem
          key={item.name}
          item={item}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
}

export default TodoList;
