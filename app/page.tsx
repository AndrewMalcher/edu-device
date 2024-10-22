import { SearchIcon } from "lucide-react"
import Header from "./components/header"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./components/barbershop-item"
import BookingItem from "./components/booking-item"

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

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input type="text" placeholder="Pesquisar..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* QUICKSEARCH */}
        <div className="mt-6 flex gap-3">
          <Button className="gap-2" variant="secondary">
            CHROMEBOOKS
          </Button>
          <Button className="gap-2" variant="secondary">
            IPADS
          </Button>
          <Button className="gap-2" variant="secondary">
            NOTEBOOKS
          </Button>
          <Button className="gap-2" variant="secondary">
            PROJETOR
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
        <BookingItem />

        {/* POPULARES */}
        <h2 className="foont-bold mb-3 mt-6 uppercase text-gray-400">
          Faculdades
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops
            .filter((barbershop) => barbershop.name === "Faculdade La Salle") // Filtra para mostrar apenas as barbearias com título "Faculdade La Salle"
            .map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
        </div>

        {/* POPULARES */}
        <h2 className="foont-bold mb-3 mt-6 uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops
            .filter((barbershop) => barbershop.name === "Faculdade La Salle") // Filtra para mostrar apenas as barbearias com título "Faculdade La Salle"
            .map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
