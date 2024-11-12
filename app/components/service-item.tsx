"use client"

import { EducationalInstitution, Service, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { ptBR } from "date-fns/locale"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "@/app/components/ui/calendar"
import { useEffect, useMemo, useState } from "react"
import { addDays, format, isPast, isToday, set } from "date-fns"
import { useSession } from "next-auth/react"
import { createBooking } from "../_actions/create-booking"
import { toast } from "sonner"
import { Input } from "./ui/input"
import { getBookings } from "../_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"

interface ServiceItemProps {
  service: Service
  educationalInstitution: Pick<EducationalInstitution, "name">
}

const TIME_LIST = ["18:45", "20:45"]

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const [hour, minutes] = time.split(":").map(Number)

    if (
      isToday(selectedDay) &&
      isPast(set(new Date(), { hours: hour, minutes }))
    ) {
      return false
    }

    return !bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
  })
}

const ServiceItem = ({ service, educationalInstitution }: ServiceItemProps) => {
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const { data } = useSession()
  const router = useRouter()
  const [classroom, setClassroom] = useState<string>("")
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    if (!selectedDay) return

    const fetchBookings = async () => {
      try {
        const bookings = await getBookings({
          date: selectedDay,
          serviceId: service.id,
        })
        setDayBookings(bookings)
        setSelectedTime(undefined)
      } catch (error) {
        console.error("Erro ao buscar reservas: ", error)
      }
    }

    fetchBookings()
  }, [selectedDay, service.id])

  const handleBookingClick = () => {
    if (data?.user) {
      setBookingSheetIsOpen(true)
    } else {
      setSignInDialogIsOpen(true)
    }
  }

  const handleBookingSheetOpenChange = () => {
    setBookingSheetIsOpen(false)
    resetBookingForm()
  }

  const resetBookingForm = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setClassroom("")
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime || !classroom) return

      const [hour, minute] = selectedTime.split(":").map(Number)
      const newDate = set(selectedDay, { hours: hour, minutes: minute })

      await createBooking({
        serviceId: service.id,
        date: newDate,
        description: classroom,
      })

      handleBookingSheetOpenChange()

      toast.success("Reserva criada com sucesso", {
        action: {
          label: "Ver agendamentos",
          onClick: () => router.push("/bookings"),
        },
      })
    } catch (error) {
      console.error("Erro ao criar reserva: ", error)
      toast.error("Erro ao criar reserva")
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            <Sheet
              open={bookingSheetIsOpen}
              onOpenChange={handleBookingSheetOpenChange}
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={handleBookingClick}
              >
                Reservar
              </Button>

              <SheetContent className="overflow-y-scroll px-0 [&::-webkit-scrollbar]:hidden">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>
                <div className="border-b border-solid py-5 capitalize">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    fromDate={addDays(new Date(), 2)}
                  />
                </div>
                {selectedDay && (
                  <div>
                    {timeList.length > 0 ? (
                      <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                        {timeList.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="rounded-full"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="p-5 text-center text-sm text-red-500">
                        Não há mais horários disponíveis para este dia!
                      </p>
                    )}
                  </div>
                )}
                {selectedTime && selectedDay && timeList.length > 0 && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Data:</h2>
                          <p className="text-sm text-gray-300">
                            {format(selectedDay, "d 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Horário:</h2>
                          <p className="text-sm text-gray-300">
                            {selectedTime}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">
                            Instituição:
                          </h2>
                          <p className="text-sm text-gray-300">
                            {educationalInstitution.name}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">
                            Sala de aula:
                          </h2>
                          <Input
                            required
                            type="text"
                            placeholder="Digite a sala de aula"
                            className="w-40 rounded bg-gray-800 px-2 py-1 text-center text-sm text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                            value={classroom}
                            onChange={(e) => setClassroom(e.target.value)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <SheetFooter className="mt-5 px-5">
                  <Button
                    onClick={handleCreateBooking}
                    disabled={!selectedDay || !selectedTime || !classroom}
                  >
                    Reservar
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>

      <Dialog open={signInDialogIsOpen} onOpenChange={setSignInDialogIsOpen}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
export default ServiceItem
