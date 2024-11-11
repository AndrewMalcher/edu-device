import Header from "./components/header"
import { Button } from "./components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import EducationalInstitutionItem from "./components/educationalinstitution-item"
import BookingItem from "./components/booking-item"
import Search from "./components/search"
import { quickSearchOptions } from "./_constants/search"
import Link from "next/link"

const Home = async () => {
  // Buscar instituições educacionais no banco de dados
  const educationalInstitutions = await db.educationalInstitution.findMany({})
  console.log({ educationalInstitutions })

  return (
    <div>
      {/* HEADER */}
      <Header />
      {/* HEADER */}

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Andrew!</h2>
        <p>Segunda-feira, 05 de agosto.</p>
        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>
        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/institutions?service=${option.title}`}>
                {option.title}
              </Link>
            </Button>
          ))}
        </div>
        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende com as melhores instituições"
            className="rounded-xl object-cover"
            fill
            src="/Banner01.png"
          />
        </div>
        {/* AGENDAMENTO */}
        <BookingItem />
        {/* POPULARES */}
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">MANAUS</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {educationalInstitutions
            .filter((institution) => institution.name === "Faculdade La Salle") // Filtra para mostrar apenas instituições com o nome "Faculdade La Salle"
            .map((institution) => (
              <EducationalInstitutionItem
                key={institution.id}
                educationalinstitution={institution}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
