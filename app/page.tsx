import { SearchIcon } from "lucide-react"
import Header from "./components/header"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Avatar, AvatarImage } from "./components/ui/avatar"

const Home = () => {
  return (
    <div>
      {/* HEADER */}
      <Header />
      {/* HEADER */}

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Andrew!</h2>
        <p>Segunda-fera, 05 de agosto.</p>
        {/* text */}
        <div className="mt-6 flex items-center gap-2">
          <Input type="text" placeholder="Pesquisar..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            className="rounded-xl object-cover"
            fill
            src="/Banner Pizza.png"
          />
        </div>

        {/* AGENDAMENTO */}
        <Card className="mt-6">
          <CardContent className="flex">
            {/* ESQUERDA   */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge>Confirmado</Badge>
              <h3>Carrinho de Chromebook</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/FRENTE LA SALLE.png" />
                </Avatar>
                <p className="text-sm">Faculdade La Salle</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home
