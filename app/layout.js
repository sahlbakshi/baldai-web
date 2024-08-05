import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Bald AI - Are You Balding?",
  description: "Find out if you're balding with Bald AI",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta property="og:image" content="<generated>" />
      <meta property="og:image:type" content="<generated>" />
      <meta property="og:image:width" content="<generated>" />
      <meta property="og:image:height" content="<generated>" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
