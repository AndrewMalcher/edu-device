"use client"

import { EducationalInstitution, Service, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
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
import { useEffect, useState } from "react"
import { addDays, format, set } from "date-fns"
import { useSession } from "next-auth/react"
import { createBooking } from "../_actions/create-booking"
import { toast } from "sonner"
import { Input } from "./ui/input"
import { getBookings } from "../_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import { fromZonedTime } from "date-fns-tz"
import { useRouter } from "next/navigation"

interface ServiceItemProps {
  service: Service
  educationalInstitution: Pick<EducationalInstitution, "name">
}

const TIME_LIST = [
  "06:45",
  "07:35",
  "08:25",
  "09:15",
  "10:05",
  "10:55",
  "11:45",
  "12:35",
  "13:25",
  "14:15",
  "15:05",
  "15:55",
  "16:45",
  "17:35",
  "18:25",
  "19:15",
  "20:45",
]

function convertTimeToUTC({
  date,
  timeZone,
}: {
  date: Date
  timeZone: string
}) {
  const utcDate = fromZonedTime(date, timeZone)
  return utcDate // Horário local const utcDate = zonedTimeToUtc(localDate, 'America/Sao_Paulo')
}
const getTimeList = (bookings: Booking[]) => {
  console.log(bookings)
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])
    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, educationalInstitution }: ServiceItemProps) => {
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const { data } = useSession()
  const router = useRouter()
  const [classroom, setClassroom] = useState<string>("") // Novo estado para sala de aula
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: convertTimeToUTC({
          date: selectedDay,
          timeZone: "America/Manaus",
        }),
        serviceId: service.id,
      })
      setDayBookings(bookings)
      setSelectedTime(undefined)
    }
    fetch()
  }, [selectedDay, service.id])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
    setClassroom("")
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    //1. não exibir horários que já foram agendados
    try {
      if (!selectedDay || !selectedTime || !classroom) return
      //["09:00 || "00]
      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })
      await createBooking({
        serviceId: service.id,
        date: convertTimeToUTC({ date: newDate, timeZone: "America/Manaus" }),
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
      console.error(error)
      toast.error("Erro ao criar reserva")
    }
  }

  const availableTimes = getTimeList(dayBookings)

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          {/* IMAGE */}
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              sizes="33vw"
              className="rounded-lg object-center"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description} </p>
            <div className="flex items-center justify-between">
              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleBookingClick()}
                >
                  Reservar
                </Button>

                {/* DIREITA */}
                <SheetContent className="overflow-y-scroll px-0 [&::-webkit-scrollbar]:hidden">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <div className="border-b border-solid py-5 capitalize">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      fromDate={addDays(new Date(), 2)}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                      }}
                    />
                  </div>
                  {selectedDay && (
                    <div>
                      {availableTimes.length > 0 ? (
                        <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                          {availableTimes.map((time) => (
                            <Button
                              key={time}
                              variant={
                                selectedTime === time ? "default" : "outline"
                              }
                              className="rounded-full"
                              onClick={() => handleTimeSelect(time)}
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
                  {selectedTime && selectedDay && availableTimes.length > 0 && (
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
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
export default ServiceItem
