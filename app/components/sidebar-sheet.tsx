"use client"
import { HomeIcon, CalendarIcon, LogOutIcon, LogInIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetContent, SheetHeader, SheetTitle, SheetClose } from "./ui/sheet"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLoginWithGoogleCLick = () => signIn("google")
  const handleLogoutWithGoogleCLick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="boder-solid flex items-center justify-between gap-3 border-b py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold">Olá, Faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
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
                  <Image
                    src="/Google.png"
                    alt="Google"
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="default" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>
      <div className="flex flex-col gap-4 border-b border-solid py-5">
        <Button
          variant="ghost"
          className="justify-start gap-2"
          onClick={handleLogoutWithGoogleCLick}
        >
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
