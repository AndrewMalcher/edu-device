"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = async ({ serviceId, date }: GetBookingsProps) => {
  if (!serviceId || !(date instanceof Date)) {
    throw new Error(
      "Parâmetros inválidos: `serviceId` ou `date` não são válidos.",
    )
  }

  // Garantir que o `date` esteja no formato UTC para evitar problemas de fuso horário.
  const start = startOfDay(date)
  const end = endOfDay(date)

  try {
    const bookings = await db.booking.findMany({
      where: {
        serviceId: serviceId,
        date: {
          gte: start,
          lte: end,
        },
      },
    })

    return bookings
  } catch (error) {
    console.error("Erro ao buscar agendamentos: ", error)
    throw new Error("Erro ao buscar agendamentos.")
  }
}
