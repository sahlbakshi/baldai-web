import Image from "next/image"

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-10 md:gap-20 p-6 font-sfProText bg-[#0A0A0A]">
      <Image 
        className="rounded-2xl mb-10 md:mb-20" 
        src={'/logo.png'} 
        width={190} 
        height={190} 
        alt="app logo" 
      />

      <div className="flex flex-col text-center md:text-left mb-10 md:mb-20">
        <h1 className="text-3xl md:text-4xl mb-2 mt-2 font-medium text-white">HAIRLOSS AI</h1>
        <h2 className="text-xl md:text-2xl mb-4 md:mb-10 font-regular text-gray-200 italic">Are you balding?</h2>
        <a 
          href="https://apps.apple.com/us/app/bald-ai-are-you-balding/id6563141135" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Image 
            src={'/apple.svg'} 
            width={230} 
            height={130} 
            alt="app store download"
          />
        </a>     
      </div>
      
      <div className="absolute top-10 text-center text-white">
        Tricho Labs  © 2024
      </div>

      <div className="absolute bottom-10 text-center w-full">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <a href="/policy" className="text-white mb-4 md:mb-0 md:mr-12">Privacy Policy</a>
          <a href="/terms" className="text-white">Terms and Conditions</a>
        </div>
      </div>
    </main>
  )
}
