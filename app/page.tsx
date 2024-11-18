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
import { toZonedTime } from "date-fns-tz"

const Home = async () => {
  // Recuperar sessão do usuário
  const session = await getServerSession(authOptions)

  // Buscar usuário no banco de dados para obter o ID, caso necessário
  let userId: string | undefined = undefined
  if (session?.user?.email) {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    })
    userId = user?.id
  }

  // Buscar instituições educacionais no banco de dados
  const [educationalInstitutions, confirmedBookings] = await Promise.all([
    db.educationalInstitution.findMany(),
    userId
      ? db.booking.findMany({
          where: {
            userId,
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
      : [],
  ])
  const popularInstitution = await db.educationalInstitution.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const timeZone = "America/Manaus"

  // Pegar a data atual e convertê-la para o horário de Manaus
  const now = new Date()
  const zonedDate = toZonedTime(now, timeZone)

  // Formatando a data no fuso horário de Manaus
  const formattedDate = format(zonedDate, "EEEE, dd 'de' MMMM", {
    locale: ptBR,
  })

  return (
    <div>
      {/* HEADER */}
      <Header />

      {/* TEXTO */}
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "bem-vindo"}!
        </h2>
        <p className="capitalize">{formattedDate}</p>

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
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {educationalInstitutions.map((educationalInstitutions) => (
            <EducationalInstitutionItem
              key={educationalInstitutions.id}
              educationalinstitution={educationalInstitutions}
            />
          ))}
        </div>

        {/* POPULARES */}
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">MANAUS</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularInstitution.map((educationalInstitutions) => (
            <EducationalInstitutionItem
              key={educationalInstitutions.id}
              educationalinstitution={educationalInstitutions}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
