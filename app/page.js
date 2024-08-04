import Image from "next/image"

export default function Home() {
  return (
    <main className="flex flex-row justify-center items-center min-h-screen gap-20 font-uber">
      <div className="flex flex-col text-left mb-20">
        <h1 className="text-3xl mb-2 font-medium">Bald AI</h1>
        <h2 className="text-2xl mb-10 font-regular">Find out if you're balding</h2>
        <Image src={'/apple.svg'} width={220} height={200}></Image>
      </div>
      <Image className="rounded-3xl mb-20" src={'/logo.png'} width={200} height={200}></Image>
    </main>
  )
}
