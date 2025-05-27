export const typeDefs = `
  type Todo {
    id: ID!
    title: String
    completed: Boolean
    deprecatedField: String @deprecated(reason: "Use newArg")
  }

  type Query {
    todos: [Todo]
    todoById(id: ID!): Todo
  }

  type Mutation {
    createTodo(title: String!, completed: Boolean!): Todo
    updateTodo(id: ID!, title: String, completed: Boolean): Todo
    deleteTodo(id: ID!): Todo
  }
`

export const todos = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
  {
    id: 4,
    title: 'et porro tempora',
    completed: true,
  },
  {
    id: 5,
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    completed: false,
  },
  {
    id: 6,
    title: 'qui ullam ratione quibusdam voluptatem quia omnis',
    completed: false,
  },
  {
    id: 7,
    title: 'illo expedita consequatur quia in',
    completed: false,
  },
]
