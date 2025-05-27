import { gql } from '@apollo/client'

export const GET_TODOS = gql`
  fragment TodoDetails on Todo {
    id
    title
    completed
  }

  query GetTodos {
    todos {
      ...TodoDetails
    }
    poops
  }
`

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $completed: Boolean!) {
    createTodo(title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $title: String, $completed: Boolean) {
    updateTodo(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`

export const GET_TODO_WITH_CONDITION = gql`
  query getTodoWithCondition($includeCompleted: Boolean!) {
    todoById(id: 2) {
      id
      title
      completed @include(if: $includeCompleted)
    }
  }
`
