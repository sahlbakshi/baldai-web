import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bald AI - Are You Balding?",
  description: "Find out if you're balding with Bald AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://www.baldaiapp.com/" />
        <meta name="twitter:card" content="" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/logo.png" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
