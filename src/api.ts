import axios from 'axios'
import { type Todo as TodoType } from "./types/types"

const BASE_URL = 'https://api.jsonbin.io/v3/b' // URL base para JSONBin.io
const MASTER_KEY = '' // Reemplaza con tu clave maestra
const BIN = '' // ID del bin a utilizar
const RUTA = `${BASE_URL}/${BIN}`
const headers = {
    'Content-Type': 'application/json',
    'X-Master-Key': MASTER_KEY
  }

let todos: { id: string, title: string, completed: boolean }[] = []

export const getTodos = async () => {
  try {
    const response = await axios.get(RUTA, { headers })
    todos = Array.isArray(response.data.record) ? response.data.record : []
    console.log('Datos obtenidos de la API:', todos)
    return todos
  } catch (error) {
    console.error('Error al obtener los pendientes', error)
    return []
  }
}

export const deleteTodo = async (id: string) => {
    try {
      const response = await axios.get(RUTA, { headers })
      const updatedTodos = response.data.record.filter((todo: { id: string }) => todo.id !== id)
      await axios.put(RUTA,  updatedTodos , { headers })
      return updatedTodos
    } catch (error) {
      console.error('Error al eliminar el todo desde el backend:', error)
      throw error
    }
  }

export const updateTodo = async (id: string, completed: boolean): Promise<TodoType[]> => {
    try {   
      const updatedTodos = todos.map((todo: TodoType) => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
      await axios.put(RUTA,  updatedTodos , { headers })
      return updatedTodos
    } catch (error) {
      console.error('Error al actualizar el todo:', error)
      throw error
    }
  }

  export const addTodo = async (updatedTodos: TodoType[]) => {
    try {
        const response = await axios.put(RUTA, updatedTodos, { headers });
        return response.data.record
    } catch (error) {
      console.error('Error al agregar el nuevo todo desde el backend:', error)
      throw error
    }
  }

