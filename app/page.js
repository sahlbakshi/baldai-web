import Image from "next/image"

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-10 md:gap-20 p-6 font-uber bg-black">
      <div className="flex flex-col text-center md:text-left mb-10 md:mb-20">
        <h1 className="text-3xl md:text-4xl mb-2 mt-2 font-medium text-white">Bald AI</h1>
        <h2 className="text-xl md:text-2xl mb-4 md:mb-10 font-regular text-gray-100">Find out if you&apos;re balding</h2>
        <Image 
          src={'/apple.svg'} 
          width={200} 
          height={140} 
          alt="app store download" 
          className="mx-auto md:mx-0"
        />
      </div>
      <Image 
        className="rounded-3xl mb-10 md:mb-20" 
        src={'/logo.png'} 
        width={190} 
        height={190} 
        alt="app logo" 
      />
    </main>
  )
}
