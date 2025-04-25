import React from 'react'
import { Badge, IconButton, Checkbox, Stack, Spinner, Center, Spacer } from '@chakra-ui/react'
import { LuTrash } from 'react-icons/lu'
import { useQuery } from '@apollo/client'
import { GET_TODOS } from '@/graphql/queries'

type Props = {
  deleteTodo: (id: string) => void
  changeTodo: (id: string) => void
}

function TodoList({ changeTodo, deleteTodo }: Props) {
  const { loading, data } = useQuery(GET_TODOS)

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    )
  }

  if (!data?.todos?.length) {
    return (
      <Badge p="4" mx="8" borderRadius="lg">
        No Todos, yay!!!
      </Badge>
    )
  }

  return (
    <Stack
      p="8"
      mx="8"
      maxHeight="60vh"
      overflowY="auto"
      borderColor="gray.100"
      borderWidth="2px"
      borderRadius="lg"
      gap="4"
    >
      {data.todos.map((todo: any) => (
        <Stack direction="row" key={todo.id} align="center">
          <Checkbox.Root checked={todo.completed} key={todo.id} onClick={() => changeTodo(todo.id)}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{todo.title}</Checkbox.Label>
          </Checkbox.Root>
          <Spacer />
          {/*<IconButton aria-label="edit">*/}
          {/*  <LuPen />*/}
          {/*</IconButton>*/}
          <IconButton onClick={() => deleteTodo(todo.id)} aria-label="delete">
            <LuTrash />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  )
}

export default TodoList
