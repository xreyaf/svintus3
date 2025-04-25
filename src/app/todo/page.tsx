import { Metadata } from 'next'
import React from 'react'
import Component from '@/app/todo/component'

export const metadata: Metadata = {
  title: 'Todo List',
  robots: 'noindex, nofollow',
}

export default function Page() {
  return <Component />
}
