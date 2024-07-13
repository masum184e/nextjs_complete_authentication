import 'tailwindcss/tailwind.css';
import 'flowbite/dist/flowbite.css';
import NavBar from '@/components/layout/NavBar';
import { Toaster } from 'react-hot-toast';
import Provider from '@/context/Provider';

export const metadata = {
  title: 'Next.js Complete Authentication',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body>
        <Provider>
          <NavBar />
          <Toaster position="top-right" />
          <main className="max-w-screen-xl mx-auto">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
