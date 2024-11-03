import FullHeightContainer from "@/components/FullHeightContainer"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NotFound() {
  return (
    <FullHeightContainer>
      <Alert variant="destructive">
        <AlertDescription>404 Not Found - This is not a valid page.</AlertDescription>
      </Alert>
    </FullHeightContainer>
  )
}
