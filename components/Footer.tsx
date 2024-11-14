import React from "react"

const dot = <p className="mx-3">•</p>

function Footer() {
  return (
    <div className="w-full flex flex-row my-5 gap-16 sm:gap-48 md:gap-80 text-sm">
      <a href="/" className="hover:underline text-gray-300">
        © 2024 Tricho Labs
      </a>
      <div className="flex flex-row gap-5">
        <a href="/policy" className="underline text-gray-300">
          Privacy Policy
        </a>
        <a href="/terms" className="underline text-gray-300">
          Terms & Conditions
        </a>
      </div>
    </div>
  )
}

export default Footer
