import { Metadata } from 'next'
import React from 'react'
import Component from '@/app/chat/component'

export const metadata: Metadata = {
  title: 'Gemini Chat',
  robots: 'noindex, nofollow',
}

export default function Page() {
  return <Component />
}
