import { SearchIcon } from "lucide-react"
import Header from "./components/header"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Avatar, AvatarImage } from "./components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./components/barbershop-item"

const Home = async () => {
  // chamar meu banco de dados
  const barbershops = await db.barbershop.findMany({})
  console.log({ barbershops })

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

        <h2 className="foont-bold mb-3 mt-6 uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA   */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Carrinho de Chromebook</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/FRENTE LA SALLE.png" />
                </Avatar>
                <p className="border-r-2 border-solid px-1 text-sm">
                  Faculdade La Salle
                </p>
                <p>301C</p>
              </div>
            </div>
            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text=sm">20:00</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="foont-bold mb-3 mt-6 uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
