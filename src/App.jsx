
import { useState } from "react";
import "./styles.css";

function App() {
  const [newToDoName, setNewToDoName] = useState("");
  const [todos, setToDos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  function addNewToDo() {
    if (newToDoName === "") return;

    setToDos((currentToDos) => {
      return [
        ...currentToDos,
        { name: newToDoName, completed: false, id: crypto.randomUUID() },
      ];
    });

    setNewToDoName(""); // Clear the input after adding
  }

  function toggleToDo(todoId, completed) {
    setToDos((currentToDos) => {
      return currentToDos.map((todo) =>
        todo.id === todoId ? { ...todo, completed } : todo
      );
    });
  }

  function deleteToDo(id) {
    setToDos((currentToDos) => {
      return currentToDos.filter((todo) => todo.id !== id);
    });
  }

  function toggleShowCompleted() {
    setShowCompleted(!showCompleted);
  }

  return (
    <> 
    <h1>Today's To Do List</h1>

      <ul id="list">
        {todos
          .filter((todo) => showCompleted || !todo.completed)
          .map((todo) => (
            <li key={todo.id} className="list-item">
              <label className="list-item-label">
                <input
                  type="checkbox"
                  data-list-item-checkbox
                  checked={todo.completed}
                  onChange={(e) => toggleToDo(todo.id, e.target.checked)}
                />
                <span data-list-item-text>{todo.name}</span>
              </label>
              <button data-button-delete onClick={() => deleteToDo(todo.id)}>
              Delete
                <i className="fas fa-trash-alt"></i>
               
              </button>
            </li>
          ))}
      </ul>

      <button className="show-hide-btn" onClick={toggleShowCompleted}>
        {showCompleted ? "Hide Completed" : "Show Completed"}
      </button>

      <div id="new-todo-form">
        <label htmlFor="todo-input">New ToDo</label>
        <input
          type="text"
          id="todo-input"
          value={newToDoName}
          onChange={(e) => setNewToDoName(e.target.value)}
        />
        <button onClick={addNewToDo}>Add ToDo</button>
      </div>
    </>
  );
}

export default App;
