import { Button } from "./ui/button"
import Image from "next/image"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { signIn } from "next-auth/react"

const SignInDialog = () => {
  const handleLoginWithGoogleCLick = () => signIn("google")

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma.</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta Google.
        </DialogDescription>
      </DialogHeader>
      <Button
        variant="outline"
        className="gap-1 font-bold"
        onClick={handleLoginWithGoogleCLick}
      >
        <Image src="/Google.png" alt="Google" width={18} height={18} />
        Google
      </Button>
    </>
  )
}

export default SignInDialog
