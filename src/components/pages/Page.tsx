import { ReactNode } from "react"

interface PageProps {
  title?: string
  children: ReactNode
}

const Page = ({ children }: PageProps) => {
  return <>{children}</>
}

export default Page
