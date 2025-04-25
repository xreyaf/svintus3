import { Provider } from '@/shared/ui/provider'
import { Noto_Sans } from 'next/font/google'
import { ClientApolloProvider } from './ApolloProvider'

const noto = Noto_Sans({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientApolloProvider>
      <html lang="en" className={noto.className} suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <title>Svintus</title>
        </head>

        <body>
          <Provider>
            <div id="root">{children}</div>
          </Provider>
        </body>
      </html>
    </ClientApolloProvider>
  )
}
