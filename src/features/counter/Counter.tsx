'use client'

import { Button, ButtonGroup, Card, HStack, Link, Stack, Strong, Text } from '@chakra-ui/react'
import { getAvatarUrl, getClearVerbForm, getRuLocale, getSocialNickname } from './utils'
import { CounterStoreProvider, useCounterStore } from '@/providers/counter-store-provider'
import { Avatar } from '@/shared/ui/avatar'
import { LuMinus, LuPlus, LuTrash } from 'react-icons/lu'
import { toaster } from '@/shared/ui/toaster'
import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'

interface ICounterProp {
  name: string
}

const Counter = ({ name }: ICounterProp) => {
  return (
    <CounterStoreProvider name={name}>
      <CounterContent name={name} />
    </CounterStoreProvider>
  )
}

const CounterContent = ({ name }: ICounterProp) => {
  const { count, incrementCount, decrementCount, setCount } = useCounterStore((state) => state)

  const gradient = 'linear-gradient(315deg, hsla(211, 96%, 62%, 1) 0%, hsla(295, 94%, 76%, 1) 100%)'
  const formattedName = name.replace('counter', '')
  const ruLocaleName = getRuLocale(formattedName, 'nominative')
  const ruAccusativeName = getRuLocale(formattedName, 'accusative')
  const socialNickname = getSocialNickname(formattedName)
  const clearVerb = getClearVerbForm(formattedName)

  const handleIncrement = () => {
    incrementCount()
    toaster.create({
      title: `Прибавили очко ${getRuLocale(formattedName, 'dative')}`,
      overlap: true,
      duration: 1500,
    })
  }

  const handleDecrementCount = () => {
    decrementCount()
    toaster.create({
      title: `Убавили очко ${getRuLocale(formattedName, 'dative')}`,
      type: 'info',
      overlap: true,
      duration: 1500,
    })
  }

  const handleClearCount = () => {
    setCount(0)
    toaster.create({
      title: `${ruLocaleName} ${clearVerb}`,
      type: 'info',
      overlap: true,
      duration: 2000,
    })
  }

  return (
    <Card.Root variant="subtle" w={400} flex="auto" bg="bg.muted" borderRadius={16}>
      <Card.Body>
        <HStack mb="6" gap="3">
          <Avatar size="2xl" src={getAvatarUrl(formattedName)} name={formattedName} />
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {ruLocaleName}
            </Text>
            <Link href={`https://t.me/${socialNickname}`} target="_blank" color="fg.muted" textStyle="sm">
              @{socialNickname}
            </Link>
          </Stack>
        </HStack>
        <Card.Description textAlign="center">
          <Strong fontSize="6xl" bgGradient={gradient} bgClip="text">
            {count}
          </Strong>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <ButtonGroup w="100%">
          <Button variant="subtle" colorPalette="red" flex="1" onClick={handleDecrementCount}>
            <LuMinus />
          </Button>
          <DialogRoot size="sm" placement="bottom" lazyMount>
            {/* @ts-ignore */}
            <DialogTrigger asChild>
              <Button variant="subtle" colorPalette="black" flex="1">
                <LuTrash />
              </Button>
            </DialogTrigger>
            {/* @ts-ignore */}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Точно хотите обнулить {ruAccusativeName}?</DialogTitle>
              </DialogHeader>

              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Нет</Button>
                </DialogActionTrigger>
                <Button colorPalette="red" onClick={handleClearCount}>
                  Да
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
          <Button variant="subtle" colorPalette="blue" flex="1" onClick={handleIncrement}>
            <LuPlus />
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card.Root>
  )
}

export default Counter
