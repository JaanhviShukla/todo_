import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished,setshowFinished]=useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }


  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }
  const toggleFinished= (e) => {
    setshowFinished(!showFinished)
    
  }
  



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });

    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item => {
      return item.id!== id
    });

    setTodos(newTodos)
    saveToLS()

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-pink-200 text-pink-600 min-h-[80vh] w-1/2 gap-4">
      <h1 className='font-bold text-center text-xl'>iArchie - manage all your todos at one place</h1>
        <div className='addTodo my-5 flex flex-col'>
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type='text' className='bg-white w-full rounded-full px-5 py-2' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-pink-600 hover:bg-pink-800 p-2 py-1 text-white rounded-md text-sm font-bold'>Save</button>
        </div>
        <input onChange={toggleFinished} type= "checkbox"checked={showFinished}/>Show finished
        <h2 className='text-lg font-bold '>Your todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No Todos to display</div>}
          {todos.map(item => {


            return (showFinished||!item.isCompleted) &&<div key={item.id} className="todo my-3 flex justify-between w-1/2">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted? "line-through" : ""}>{item.todo}</div>
              </div>


              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-pink-600 hover:bg-pink-800 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><MdEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-pink-600 hover:bg-pink-800 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><MdDelete /></button>
              </div>

            </div>
          })}


        </div>
      </div>
    </>
  )
}

export default App
