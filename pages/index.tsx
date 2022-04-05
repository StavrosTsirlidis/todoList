import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { TodoType } from '../types/todo'
import { Todo } from '../components/todo'

const Home: NextPage = () => {

  let [todo, setTodo] = useState<TodoType[]>([]);
  let [title, setTitle] = useState('');
  let [performed, setPerformed] = useState(false);

  useEffect(() => {
    fetch('/api/todo')
      .then(res => res.json())
      .then(data => { setTodo(data) })
      .catch(e => { console.log(e.message); })
  }, []);

  const handleAddClick = () => {
    fetch(('./api/todo'), { method: 'POST', body: JSON.stringify({ title, performed }) })
      .then(res => res.json())
      .then(data => {
        setTodo([...todo].concat(data.todo));
        setTitle('');
      })
      .catch(e => { console.log(e.err); })
  }

  const handleDeleteClick = (id: number) => {
    fetch((`/api/todo/${id}`), { method: 'PATCH' })
      .then(() => setTodo(todo.filter(todoObject => todoObject.id !== id)))
      .catch(e => { console.log(e.err); })
  }

  const handleSetDoneClick = (id: number, performed: boolean) => {
    fetch((`/api/todo/${id}`), { method: 'PUT', body: JSON.stringify({ performed }) })
      .then(res => res.json())
      .then(data => { setTodo(data) })
      .catch(e => { console.log(e.err); })
  }

  const handleFilterDoneClick = () => {
    const getAllDoneTodos = todo.filter(todoObject => todoObject.performed === true)
    const getNotDoneTodos = todo.filter(todoObject => todoObject.performed !== true)
    setTodo(getAllDoneTodos.concat(getNotDoneTodos));
  }

  const handleFilterNotDoneClick = () => {
    const getAllDoneTodos = todo.filter(todoObject => todoObject.performed === true)
    const getNotDoneTodos = todo.filter(todoObject => todoObject.performed !== true)
    setTodo(getNotDoneTodos.concat(getAllDoneTodos));
  }


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Todo
          </h1>
          <div className={styles.filterContainer} >
            <div>Filter</div>
            <div className={styles.filterVuttonContainer}>
              <button className={styles.filterButton} onClick={() => handleFilterDoneClick()}>done</button>
              <button className={styles.filterButton} onClick={() => handleFilterNotDoneClick()}>not done</button>
            </div>

          </div >

        </div>

        <div className={styles.todoList}>
          {todo.length <= 0 ? <p>No todos</p> : todo.map((todoObject) => {
            return (
              <Todo
                data={todoObject}
                handleDeleteClick={(e) => handleDeleteClick(e)}
                handleSetDoneClick={(e, i) => handleSetDoneClick(e, i)}
              />
            )
          })}
        </div>

        <div className={styles.addContainer}>
          <input className={styles.addInput} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="add new todo" />
          <button className={styles.addButton} onClick={() => handleAddClick()}>
            Add
          </button>
        </div>
      </main>
    </div >
  )
}

export default Home
