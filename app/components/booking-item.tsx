import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { EducationalInstitution: true } } }
  }>
}

//to do : receber agendamento como prop

const BookingItem = ({ booking }: BookingItemProps) => {
  const {
    service: { EducationalInstitution },
  } = booking
  const isConfirmed = isFuture(booking.date)
  return (
    <Sheet>
      <SheetTrigger className="w-full">
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
      </SheetTrigger>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="border-b border-solid text-left">
            Informações da Reserva
          </SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src="/maps.png"
            alt={`Mapa da instituição ${booking.service.EducationalInstitution.name}`}
            fill
            className="rounded-xl object-cover"
          />

          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={EducationalInstitution.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{EducationalInstitution.name}</h3>
                <p className="text-xs">{EducationalInstitution.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <Card className="mb-3 mt-6">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data:</h2>
                <p className="text-sm text-gray-300">
                  {format(booking.date, "d 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário:</h2>
                <p className="text-sm text-gray-300">
                  {format(booking.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Instituição:</h2>
                <p className="text-sm text-gray-300">
                  {booking.service.EducationalInstitution.name}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Sala de aula:</h2>
                <p>{booking.description}</p>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {EducationalInstitution.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
