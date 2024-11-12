import Header from "./components/header"
import { Button } from "./components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import EducationalInstitutionItem from "./components/educationalinstitution-item"
import BookingItem from "./components/booking-item"
import Search from "./components/search"
import { quickSearchOptions } from "./_constants/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"

const Home = async () => {
  const session = await getServerSession(authOptions)
  // Buscar instituições educacionais no banco de dados
  const educationalInstitutions = await db.educationalInstitution.findMany({})
  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              EducationalInstitution: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <div>
      {/* HEADER */}
      <Header />
      {/* HEADER */}

      {/* TEXTO */}
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "bem vindo"}!
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd", { locale: ptBR })}
          </span>
          <span>&nbsp;de&nbsp;</span>
          <span className="capitalize">
            {format(new Date(), "MMMM", { locale: ptBR })}
          </span>
        </p>

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
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
              AGENDAMENTOS
            </h2>
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

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
