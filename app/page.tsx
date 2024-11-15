import FullHeightContainer from "@/components/FullHeightContainer"
import Image from "next/image"

export default function Home() {
  return (
    <FullHeightContainer>
      <Image src={"/logos/hairloss-ai-white.png"} width={70} height={70} alt="Hairloss AI logo" />
      <h1 className="text-3xl mt-4 mb-8 font-medium">Hairloss AI</h1>

      <div className="flex flex-col w-[220px] gap-y-4 items-center">
        <a
          href="https://apps.apple.com/us/app/hairloss-ai-prev-bald-ai/id6563141135"
          className="bg-foreground py-4 px-6 rounded-lg w-full flex items-center justify-center gap-3 drop-shadow-button"
        >
          <Image src="/logos/apple-black.png" width={32} height={32} alt="App Store icon" />
          <span className="text-xl text-background font-medium">App Store</span>
        </a>
        <a
          href="https://apps.apple.com/us/app/hairloss-ai-prev-bald-ai/id6563141135"
          className="bg-foreground py-4 px-6 rounded-lg w-full flex items-center justify-center gap-3 drop-shadow-button"
        >
          <Image src="/logos/play-store-black.png" width={32} height={32} alt="App Store icon" />
          <span className="text-xl text-background font-medium">Play Store</span>
        </a>
      </div>
    </FullHeightContainer>
  )
}