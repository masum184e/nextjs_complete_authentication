import 'tailwindcss/tailwind.css';
import 'flowbite/dist/flowbite.css';
import NavBar from '@/components/layout/NavBar';

export const metadata = {
  title: 'Next.js Complete Authentication',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <NavBar />
        <main className="max-w-screen-xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
