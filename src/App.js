import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState('');
  const [doingList, setDoingList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(localStorage.getItem("todos").split(','));
    }
    if (localStorage.getItem("doingList")) {
      setDoingList(localStorage.getItem("doingList").split(','));
    }
    if (localStorage.getItem("doneList")) {
      setDoneList(localStorage.getItem("doneList").split(','));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", todos.join());
    localStorage.setItem("doingList", doingList.join());
    localStorage.setItem("doneList", doneList.join());
  }, [todos, doingList, doneList])

  const handleChange = e => {
    setAddTodo(e.target.value);
  }

  const addItem = (e) => {
    e.preventDefault();
    if (addTodo === "") {
      alert("Enter something in the input field first");
      return;
    }
    setTodos([...todos, addTodo]);
    setAddTodo("");
  }

  const addtoDoing = (todo) => {
    setDoingList([...doingList, todo]);
    todos.splice(todos.indexOf(todo), 1);
    setTodos(todos);
  }

  const addToDone = (doing) => {
    setDoneList([...doneList, doing]);
    doingList.splice(doingList.indexOf(doing), 1);
    setDoingList(doingList)
  }

  const removeDone = (done) => {
    setTodos([...todos]);
    doneList.splice(doneList.indexOf(done), 1);
    setDoneList(doneList);
  }

  const doLater = (doing) => {
    setTodos([...todos, doing]);
    doingList.splice(doingList.indexOf(doing), 1);
    setDoingList(doingList);
  }

  return (
    <div className="app">
      <div>
        <h2> Todo</h2>
        <ul>
          {
            todos.map(todo => (
              <li>
                {todo}
                <button onClick={() => addtoDoing(todo)}>Do</button>
              </li>
            ))
          }
        </ul>
        <form>
          <input value={addTodo} onChange={(e) => handleChange(e)} />
          <button type="submit" onClick={addItem}>Add Item</button>
        </form>
      </div>

      <div>
        <h2>Doing</h2>
        <ul>
          {
            doingList.map(doing => (
              <li>
                {doing}
                <button onClick={() => addToDone(doing)}>Done</button>
                <button onClick={() => doLater(doing)}>Do later</button>
              </li>
            ))
          }
        </ul>
      </div>

      <div>
        <h2>Done</h2>
        <ul>
          {
            doneList.map(done => (
              <li>
                {done}
                <button onClick={() => removeDone(done)}>X</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
