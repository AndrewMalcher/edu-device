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
      select: {
        id: true,
        role: true, // Inclua o campo `role` aqui
      },
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
            user: {
              select: {
                name: true,
                image: true,
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

      {/* CONTEÚDO PRINCIPAL */}
      <main className="mx-auto max-w-[1440px] px-4 md:px-8">
        {/* TEXTO */}
        <div className="py-6">
          <h2 className="text-2xl font-bold">
            Olá, {session?.user ? session.user.name : "bem-vindo"}!
          </h2>
          <p className="mt-1 text-sm capitalize text-gray-600">
            {formattedDate}
          </p>
        </div>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="flex w-fit shrink-0 items-center gap-2 px-4 py-2"
              variant="outline"
              key={option.title}
              asChild
            >
              <Link href={`/institutions?service=${option.title}`}>
                <span className="text-sm font-medium">{option.title}</span>
              </Link>
            </Button>
          ))}
        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full md:h-[300px]">
          <Image
            alt="Agende com as melhores instituições"
            className="rounded-xl"
            fill
            src="/Banner01.jpeg"
          />
        </div>

        {/* AGENDAMENTOS */}
        {confirmedBookings.length > 0 && (
          <div className="pt-6">
            <h2 className="mb-3 text-lg font-bold uppercase text-gray-500">
              Agendamentos
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </div>
        )}

        {/* RECOMENDADOS */}
        <div className="pt-6">
          <h2 className="mb-3 text-lg font-bold uppercase text-gray-500">
            Recomendados
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden">
            {educationalInstitutions
              .filter(
                (institution) => institution.name !== "Faculdade La Salle",
              )
              .map((educationalInstitutions) => (
                <EducationalInstitutionItem
                  key={educationalInstitutions.id}
                  educationalinstitution={educationalInstitutions}
                />
              ))}
          </div>
        </div>

        {/* POPULARES */}
        <div className="pt-6">
          <h2 className="mb-3 text-lg font-bold uppercase text-gray-500">
            Populares
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden">
            {popularInstitution
              .filter(
                (institution) => institution.name !== "Faculdade La Salle",
              )
              .map((institution) => (
                <EducationalInstitutionItem
                  key={institution.id}
                  educationalinstitution={institution}
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
