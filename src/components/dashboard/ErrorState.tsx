import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ErrorStateProps {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle />
        <AlertTitle>Couldn't connect to Supabase</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  )
}
