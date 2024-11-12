import { Avatar } from "@radix-ui/react-avatar"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { EducationalInstitution: true } } }
  }>
}

//to do : receber agendamento como prop

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)
  return (
    <div>
      <Card className="min-w-[90%]">
        <CardContent className="flex justify-between p-0">
          {/* ESQUERDA   */}
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
            <h3 className="font-semibold">{booking.service.name}</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={booking.service.EducationalInstitution.imageUrl}
                />
              </Avatar>
              <p className="border-r-2 border-solid px-1 text-sm">
                {booking.service.EducationalInstitution.name}
              </p>
              <p className="px-2">{booking.description}</p>
            </div>
          </div>
          {/* DIREITA */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm capitalize">
              {format(booking.date, "MMMM", { locale: ptBR })}{" "}
            </p>
            <p className="text-2xl capitalize">
              {format(booking.date, "dd", { locale: ptBR })}{" "}
            </p>
            <p className="text-sm capitalize">
              {format(booking.date, "HH:mm", { locale: ptBR })}{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookingItem
