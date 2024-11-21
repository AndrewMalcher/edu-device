"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

interface UpdateBookingParams {
  bookingId: string
  serviceId?: string
  date?: Date
  description?: string
}

export const updateBooking = async (params: UpdateBookingParams) => {
  const { bookingId, ...updateData } = params

  // Atualiza o booking com os dados fornecidos (apenas os campos definidos serão atualizados)
  await db.booking.update({
    where: {
      id: bookingId,
    },
    data: updateData,
  })

  // Revalida a página "/bookings" para refletir as mudanças
  revalidatePath("/bookings")
}
