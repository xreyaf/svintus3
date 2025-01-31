'use client'

import { Text, Center, Container, Heading, Spinner, Stack, Link } from '@chakra-ui/react'
import { Suspense } from 'react'
import { Metadata } from 'next'
import Counter from '@/features/counter/Counter'
import { Toaster } from '@/shared/ui/toaster'

export const metadata: Metadata = {
  title: 'Svintus',
}

function Home() {
  const year = new Date().getFullYear()

  return (
    <>
      <Container as="main" flex={1}>
        <Suspense fallback={<Spinner />}>
          <Stack p={4} gap="4" direction="row" wrap="wrap">
            <Center p={4} borderRadius={16} bg="bg.muted" flex="auto">
              <Heading
                bgGradient="linear-gradient(315deg, hsla(211, 96%, 62%, 1) 0%, hsla(295, 94%, 76%, 1) 100%)"
                bgClip="text"
                fontWeight="extrabold"
                size="6xl"
                letterSpacing="tight"
              >
                кто свинтус?
              </Heading>
            </Center>

            <Counter name="counterRoman" />
            <Counter name="counterElizabeth" />
            <Counter name="counterArseniy" />
            <Counter name="counterDmitriy" />
            <Counter name="counterOksana" />
          </Stack>
          <Toaster />
        </Suspense>
      </Container>
      <Container as="footer">
        <Center>
          <Text fontSize="sm" color="fg.muted" fontWeight="extrabold">
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

export default Home
