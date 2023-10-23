import { useState, useEffect } from "react";
import List from "./List";
import axios from "axios";

function Todo() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5001/api/get").then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  function addTask() {
    console.log(input);
    axios
      .post("http://localhost:5001/api/save", {
        task: input,
      })
      .then((res) => {
        setInput("");
        setUpdateUI((prev) => !prev);
      });
  }

  function updateMode(id, text) {
    console.log(id, text);
    setInput(text);
    setUpdateId(id);
  }

  function updateTask() {
    axios
      .put("http://localhost:5001/api/update/" + updateId, {
        task: input,
      })
      .then((res) => {
        setInput("");
        setUpdateUI((prev) => !prev);
      });
  }
  return (
    <div className="App">
      <div>
        <h2 className="text-blue-500 text-xl font-bold">Hello, React!</h2>
        <p className="text-lg font-medium">Hello, Typescript!</p>
      </div>
      <h1>CRUD Operations</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button type="submit" onClick={updateId ? updateTask : addTask}>
        {updateId ? "Update Task" : "Add Task"}
      </button>
      <ol>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ol>
    </div>
  );
}

export default Todo;
