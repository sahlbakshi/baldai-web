import React from "react"

const dot = <p className="mx-3">•</p>

function Footer() {
  return (
    <div className="flex flex-row my-5 justify-center text-sm">
      <a href="/" className="hover:underline">
        © 2024 Tricho Labs
      </a>
      {dot}
      <a href="/policy" className="hover:underline">
        Privacy
      </a>
      {dot}
      <a href="/terms" className="hover:underline">
        Terms
      </a>
    </div>
  )
}

export default Footer
