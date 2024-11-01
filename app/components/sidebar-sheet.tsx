import { Avatar, AvatarImage } from "./ui/avatar"
import { HomeIcon, CalendarIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetContent, SheetHeader, SheetTitle, SheetClose } from "./ui/sheet"
import Link from "next/link"

const SidebarSheet = () => {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="boder-solid flex items-center gap-3 border-b py-5">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww" />
        </Avatar>

        <div>
          <p className="font-bold">Joe Miguer</p>
          <p className="text-xs">joe.miguer@faculdadelasalle.edu.br</p>
        </div>
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
        <Button variant="ghost" className="justify-start gap-2">
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
