import { Metadata } from 'next'
import React from 'react'
import Component from '@/app/chat/component'

export const metadata: Metadata = {
  title: 'Svintus',
  robots: 'noindex, nofollow',
}

export default function Page() {
  return <Component />
}
