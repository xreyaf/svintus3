import { Button, Input, Stack } from '@chakra-ui/react'
import React, { FormEvent, useRef } from 'react'
import { toaster } from '@/shared/ui/toaster'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_TODO, GET_TODOS } from '@/graphql/queries'

const AddTodo = () => {
  const contentRef = useRef<HTMLInputElement>(null)

  const { refetch } = useQuery(GET_TODOS)

  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: () => {
      void refetch()
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (contentRef.current === null) return

    if (!contentRef.current.value) {
      toaster.create({
        description: 'No content',
        type: 'error',
      })
      return
    }

    void createTodo({ variables: { title: contentRef.current.value.trim(), completed: false } })

    contentRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" m={8}>
        <Input ref={contentRef} />
        <Button type="submit" colorScheme="green" px="8">
          Add Todo
        </Button>
      </Stack>
    </form>
  )
}

export default AddTodo
