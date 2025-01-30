import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

// import store from './store'

const Home = dynamic(() => import('./Home'))

export const metadata: Metadata = {
  title: 'Svintus',
  robots: 'noindex, nofollow',
}

export default function Page() {
  return <Home />
}
