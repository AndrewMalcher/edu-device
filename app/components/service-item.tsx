"use client"

import { EducationalInstitution, Service } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { ptBR } from "date-fns/locale"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "@/app/components/ui/calendar"
import { useState } from "react"
import { format, set } from "date-fns"
import { useSession } from "next-auth/react"
import { createBooking } from "../_actions/create-booking"
import { toast } from "sonner"
import { Input } from "./ui/input"

interface ServiceItemProps {
  service: Service
  educationalInstitution: Pick<EducationalInstitution, "name">
}

const TIME_LIST = ["18:45", "20:45"]

const ServiceItem = ({ service, educationalInstitution }: ServiceItemProps) => {
  const { data } = useSession()
  const [classroom, setClassroom] = useState<string>("") // Novo estado para sala de aula
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

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
        userId: (data?.user as any).id,
        date: newDate,
        description: classroom,
      })
      toast.success("Reserva criada com sucesso")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva")
    }
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* IMAGE */}
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            alt={service.name}
            src={service.imageUrl}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* DIREITA */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description} </p>
          <div className="flex items-center justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>
                <div className="border-b border-solid py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    styles={{
                      head_cell: { width: "100%", textTransform: "capitalize" },
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
                  <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 px-5 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}
                {selectedTime && selectedDay && (
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
                  <SheetClose asChild>
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime || !classroom}
                    >
                      Reservar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
