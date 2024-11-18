import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import Header from "../components/header"
import { db } from "../_lib/prisma"
import { notFound } from "next/navigation"
import BookingItem from "../components/booking-item"

const Booking = async () => {
  const session = await getServerSession(authOptions)
  // PARA APARECER O BOTÃO DE VISÃO GERAL DE AGENDAMENTOS, É NECESSÁRIO QUE ALTERE TAMBÉM NO ARQUIVO COMPONENTS/SIDEBAR-SHEET.TSX
  const allowedEmails = [
    "andrew.malcher.r@gmail.com",
    "andrew.malcher@lasalle.org.br",
    "gabrielsouza.porto@lasalle.org.br",
  ]
  if (!allowedEmails.includes(session?.user?.email ?? "")) {
    return notFound()
  }

  // Buscar usuário no banco de dados para obter o ID, caso necessário

  const confirmedBookings = await db.booking.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: { EducationalInstitution: true },
      },
      user: { select: { name: true, image: true } }, // Incluindo o usuário que fez a reserva
    },
    orderBy: {
      date: "asc",
    },
  })
  const concludedBookings = await db.booking.findMany({
    where: {
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: { EducationalInstitution: true },
      },
      user: { select: { name: true, image: true } }, // Incluindo o usuário que fez a reserva
    },
    orderBy: {
      date: "asc",
    },
  })

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="border-b border-solid pb-3 text-center text-xl font-bold">
          TODOS OS AGENDAMENTOS
        </h1>
        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-center text-gray-300">
            Não há agendamentos reservados.
          </p>
        )}
        {confirmedBookings.length > 0 ? (
          <>
            <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        ) : (
          <p className="text-center text-gray-300">
            Não há agendamentos confirmados ainda.
          </p>
        )}
        {concludedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Booking
