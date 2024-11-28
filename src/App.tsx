/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react"
import { Todos } from "./components/Todos"
import { FilterValue, TodoTitle, type TodoId, type Todo as TodoType} from "./types/types"
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { addTodo, deleteTodo, getTodos, updateTodo } from "./api"


const App = (): JSX.Element => {
  const [todos,setTodos] = useState<TodoType[]>([])
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  // Cargar todos los "todos" desde la API cuando el componente se monta
  useEffect(() => {
    const fetchTodos = async () => {
      const todosFromAPI = await getTodos()
      setTodos(todosFromAPI)
    }
    fetchTodos()
  }, [])

  const handleRemove = async ({ id }: TodoId) => {
    await deleteTodo(id)
    const newTodos = todos.filter(todo => todo.id != id)
    setTodos(newTodos)
  }

  const handleCompleted = async ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): Promise<void> => {
    await updateTodo(id, completed)
    const newTodos = todos.map(todo =>{
      if (todo.id == id){
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }
  
  const handelFilterChange = (filter: FilterValue): void => {
    console.log(filter)
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = async () => {
    const newTodos = todos.filter(todo => !todo.completed)
    const deletedTodos = todos.filter(todo => todo.completed)
    for (let i = 0; i < deletedTodos.length; i++) {
      await deleteTodo(deletedTodos[i].id)
    }
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

const filteredTodos = todos.filter(todo => {
  if (filterSelected == TODO_FILTERS.ACTIVE) return !todo.completed
  if (filterSelected == TODO_FILTERS.COMPLETED) return todo.completed
  return todo
})

const handleAddTodo = async ({title}: TodoTitle): Promise<void> => {
  const newTodo = {
    title,
    id: crypto.randomUUID(),
    completed: false
  }
  const newTodos = [...todos, newTodo]
  await addTodo(newTodos)
  setTodos(newTodos)
}

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo}

      />
      <Todos 
      onToggleCompleteTodo={handleCompleted}
      onRemoveTodo={handleRemove}
      todos={filteredTodos}
      />
      <Footer
      activeCount = {activeCount}
      completedCount = {completedCount}
      filterSelected = {filterSelected}
      onClearCompleted={handleRemoveAllCompleted}
      handleFilterChange={handelFilterChange}
      />
    </div>
  )
}

export default App
