import { toast } from 'react-toastify'

export const errorToast = (message: string, error?: unknown) => {
  toast(message, { type: 'error', theme: 'colored' })

  if (error) {
    console.log(`${message}\n`, error)
  }
}
