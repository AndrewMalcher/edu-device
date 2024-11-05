import Header from "./components/header"
import { Button } from "./components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./components/educationalinstitution-item"
import BookingItem from "./components/booking-item"
import Search from "./components/search"
import { quickSearchOptions } from "./_constants/search"
import Link from "next/link"

const Home = async () => {
  // chamar meu banco de dados
  const barbershops = await db.educationalInstitution.findMany({})
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
        <div className="mt-6">
          <Search />
        </div>

        {/* QUICKSEARCH */}
        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                {option.title}
              </Link>
            </Button>
          ))}
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
              <BarbershopItem
                key={barbershop.id}
                educationalinstitution={barbershop}
              />
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
              <BarbershopItem
                key={barbershop.id}
                educationalinstitution={barbershop}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
