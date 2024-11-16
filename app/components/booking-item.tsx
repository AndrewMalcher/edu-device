"use client"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import { useState } from "react"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: { include: { EducationalInstitution: true } }
      user: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { EducationalInstitution } = booking.service
  const isConfirmed = isFuture(booking.date)

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Agendamento cancelado com sucesso")
    } catch (error) {
      toast.error("Não foi possível cancelar o agendamento. Tente novamente.")
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
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
                  <AvatarImage src={EducationalInstitution.imageUrl} />
                </Avatar>
                <p className="border-r-2 border-solid px-1 text-sm">
                  {EducationalInstitution.name}
                </p>
                <p className="px-2">{booking.description}</p>
              </div>
            </div>
            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl capitalize">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm capitalize">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle className="border-b border-solid text-left">
            Informações da Reserva
          </SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src="/maps.png"
            alt={`Mapa da instituição ${EducationalInstitution.name}`}
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
                  {format(booking.date, "HH:mm")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Instituição:</h2>
                <p className="text-sm text-gray-300">
                  {EducationalInstitution.name}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Sala de aula:</h2>
                <p>{booking.description}</p>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Dúvidas? Entre em contato com o setor responsável.
            </h2>
            {EducationalInstitution.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>
        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    Cancelar Agendamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Você quer cancelar sua reserva?</DialogTitle>
                    <DialogDescription>
                      Esta ação não pode ser desfeita. Isto vai permanentemente
                      deletar seu agendamento.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button className="w-full" variant="secondary">
                        Voltar
                      </Button>
                    </DialogClose>
                    <Button
                      className="w-full"
                      variant="destructive"
                      onClick={handleCancelBooking}
                    >
                      Confirmar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
