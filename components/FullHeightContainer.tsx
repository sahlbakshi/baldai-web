import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export default function FullHeightContainer({ children }: ContainerProps) {
  return <div className="flex flex-col items-center justify-center h-full">{children}</div>
}
