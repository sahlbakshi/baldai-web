import FullHeightContainer from "@/components/FullHeightContainer"
import Image from "next/image"

export default function Home() {
  return (
    <FullHeightContainer>
      <Image src={"/logos/hairloss-ai.png"} width={70} height={70} alt="Hairloss AI logo" />
      <h1 className="text-3xl mt-4 mb-8 font-medium">Hairloss AI</h1>

      <div className="flex flex-col w-[250px] gap-y-4 items-center">
        <a
          href="https://apps.apple.com/us/app/hairloss-ai-prev-bald-ai/id6563141135"
          className="bg-black py-4 px-6 rounded-md w-full flex items-center justify-center gap-3 drop-shadow-button"
        >
          <Image src="/logos/apple.png" width={32} height={32} alt="App Store icon" />
          <span className="text-white text-lg">APP STORE</span>
        </a>
        <a
          href="https://apps.apple.com/us/app/hairloss-ai-prev-bald-ai/id6563141135"
          className="bg-black py-4 px-6 rounded-md w-full flex items-center justify-center gap-3 drop-shadow-button"
        >
          <Image src="/logos/play-store.png" width={32} height={32} alt="App Store icon" />
          <span className="text-white text-lg">PLAY STORE</span>
        </a>
      </div>
    </FullHeightContainer>
  )
}
