import { useEffect } from "react"

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { spiral } = await import("ldrs")
      spiral.register()
    }
    getLoader()
  }, [])
  return <l-line-spinner color="white"></l-line-spinner>
}