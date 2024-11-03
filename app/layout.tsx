import { Separator } from "@/components/ui/separator"
import Footer from "@/components/Footer"
import "./globals.css"

export const metadata = {
  title: "Hairloss AI",
  description: "Find out if you're losing hair with Hairloss AI",
}

const MaxWidthContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-screen px-6 sm:px-8">{children}</div>
)

export default function RootLayout({ children }) {
  return (
    <html className="dark font-sfProText" lang="en">
      <body className="flex flex-col min-h-screen bg-background text-foreground items-center">
        <main className="flex grow justify-center my-8 sm:my-16">
          <MaxWidthContainer>{children}</MaxWidthContainer>
        </main>

        <Separator />

        <MaxWidthContainer>
          <Footer />
        </MaxWidthContainer>
      </body>
    </html>
  )
}
