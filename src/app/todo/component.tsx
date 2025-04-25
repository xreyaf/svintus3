'use client'

import { Center, Container, Link, Text, Heading, Stack, Flex } from '@chakra-ui/react'
import AddTodo from '@/features/list/AddTodo'
import TodoList from '@/features/list/TodoList'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_TODO, GET_TODOS, UPDATE_TODO } from '@/graphql/queries'
import { toaster } from '@/shared/ui/toaster'

const Component = () => {
  const year = new Date().getFullYear()

  const { refetch } = useQuery(GET_TODOS)
  const [deleteTodoMutation] = useMutation(DELETE_TODO)
  const [updateTodoMutation] = useMutation(UPDATE_TODO)

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoMutation({ variables: { id: Number(id) } })
      void refetch()
      toaster.create({ description: 'Todo deleted', type: 'success' })
    } catch (e) {
      toaster.create({ description: 'Error deleting todo', type: 'error' })
    }
  }

  const changeTodo = async (id: string) => {
    try {
      await updateTodoMutation({
        variables: { id: Number(id), completed: true },
      })
      void refetch()
      toaster.create({ description: 'Todo updated', type: 'success' })
    } catch (e) {
      toaster.create({ description: 'Error updating todo', type: 'error' })
    }
  }

  return (
    <>
      <Container as="main" flex={1}>
        <Center>
          <Heading
            bgGradient="linear-gradient(315deg, hsla(211, 96%, 62%, 1) 0%, hsla(295, 94%, 76%, 1) 100%)"
            bgClip="text"
            fontWeight="extrabold"
            size="6xl"
            letterSpacing="tight"
            py={4}
          >
            Todo List With GraphQL
          </Heading>
        </Center>

        <Flex h="80vh" py={4}>
          <Stack w="100%">
            <AddTodo />
            <TodoList deleteTodo={deleteTodo} changeTodo={changeTodo} />
          </Stack>
        </Flex>
      </Container>

      <Container as="footer" py={4}>
        <Center>
          <Text fontSize="sm" color="gray.500" fontWeight="bold">
            <Link href="https://github.com/xreyaf" target="_blank">
              @xreyaf
            </Link>{' '}
            {year}
          </Text>
        </Center>
      </Container>
    </>
  )
}

export default Component
