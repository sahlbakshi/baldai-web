import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Bald AI - Are You Balding?",
  description: "Find out if you're balding with Bald AI",
  openGraph: {
    title: "Bald AI - Are You Balding?",
    description: "Find out if you're balding with Bald AI",
    url: "https://www.baldaiapp.com/",
    images: [
      {
        url: "/logo.png",
        alt: "Bald AI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bald AI - Are You Balding?",
    description: "Find out if you're balding with Bald AI",
    image: "/logo.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
