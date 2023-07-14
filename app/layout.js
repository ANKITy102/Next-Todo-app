import "../styles/app.scss"
import { Inter } from 'next/font/google'
import Header from "./Header"
import { ContextProvider } from "@/components/Clients"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo App',
  description: 'This is a Todo App Project made for Next.js series',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ContextProvider>
          <Header/>
        {children}
          </ContextProvider>
        </body>
    </html>
  )
}
