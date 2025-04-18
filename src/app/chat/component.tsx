'use client'

import { Suspense, useState } from 'react'
import { ConversationMessage, ConversationMessages } from '@/lib/chatCompletionModel'
import {
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Link,
  Spinner,
  Stack,
  Text,
  Box,
  Heading,
  Textarea,
} from '@chakra-ui/react'

const Component = () => {
  const year = new Date().getFullYear()

  const [latestMessage, setLatestMessage] = useState<string>('')
  const [messages, setMessages] = useState<ConversationMessages>([])
  const [inputValue, setInputValue] = useState<string>('')

  const obtainAPIResponse = async (apiRoute: string, apiData: any) => {
    const apiResponse = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
    })

    if (!apiResponse.body) return

    const reader = apiResponse.body.pipeThrough(new TextDecoderStream()).getReader()

    let incomingMessage = ''

    while (true) {
      const { value, done } = await reader.read()
      if (done) {
        setMessages((prev) => [...prev, { role: 'assistant', content: incomingMessage }])
        setLatestMessage('')
        break
      }
      if (value) {
        incomingMessage += value
        setLatestMessage(incomingMessage)
      }
    }
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const newMessages = [...messages, { role: 'user', content: inputValue } as ConversationMessage]
    setMessages(newMessages)
    setInputValue('')
    await obtainAPIResponse('/api/stream/completion/chat', { messages: newMessages })
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
            SSE LLM Stream With Gemini
          </Heading>
        </Center>
        <Suspense fallback={<Spinner />}>
          <Flex h="80vh" py={4}>
            <Flex
              flexDirection="column"
              w="5xl"
              m="auto"
              h="full"
              borderWidth="2px"
              rounded="lg"
              overflow="hidden"
            >
              <Stack
                px={4}
                py={4}
                overflowY="auto"
                flex={1}
                gap={4}
                bg="black"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#d5e3f7',
                    borderRadius: '24px',
                  },
                }}
              >
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                    bg={msg.role === 'user' ? 'blue.300' : 'purple.300'}
                    color="black"
                    px={4}
                    py={2}
                    borderRadius="lg"
                    maxW="80%"
                  >
                    <Text fontSize="sm">{msg.content}</Text>
                  </Box>
                ))}
                {latestMessage && (
                  <Box
                    bg="gray.200"
                    px={4}
                    py={2}
                    borderRadius="lg"
                    alignSelf="flex-start"
                    maxW="80%"
                  >
                    <Text fontSize="sm">{latestMessage}</Text>
                  </Box>
                )}
              </Stack>

              <HStack p={4} bg="gray.100">
                <Textarea
                  bg="white"
                  color="black"
                  placeholder="Enter your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') void handleSend()
                  }}
                />
                <Button onClick={handleSend}>Send</Button>
              </HStack>
            </Flex>
          </Flex>
        </Suspense>
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
