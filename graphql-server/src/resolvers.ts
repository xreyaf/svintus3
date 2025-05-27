import { todos } from './schema.js'

let todoIdCounter = 10

export const resolvers = {
  Query: {
    todos: () => todos,

    todoById: (_: any, { id }: { id: number }) => {
      return todos.find((todo) => todo.id === id)
    },
  },

  Mutation: {
    createTodo: (_: any, { title, completed }: { title: string; completed: boolean }) => {
      const newTodo = {
        userId: 1,
        id: todoIdCounter++,
        title,
        completed,
      }
      todos.push(newTodo)
      return newTodo
    },

    updateTodo: (
      _: any,
      { id, title, completed }: { id: number; title?: string; completed?: boolean }
    ) => {
      const todo = todos.find((t) => t.id === id)
      if (!todo) return null

      if (title !== undefined) todo.title = title
      if (completed !== undefined) todo.completed = completed

      return todo
    },

    deleteTodo: (_: any, { id }: { id: number }) => {
      const index = todos.findIndex((t) => t.id === id)
      if (index === -1) return null

      const [deletedTodo] = todos.splice(index, 1)
      return deletedTodo
    },
  },
}
