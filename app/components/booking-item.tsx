import { Avatar } from "@radix-ui/react-avatar"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { AvatarImage } from "./ui/avatar"

//to do : receber agendamento como prop

const BookingItem = () => {
  return (
    <div>
      <h2 className="foont-bold mb-3 mt-6 uppercase text-gray-400">
        Agendamentos
      </h2>
      <Card>
        <CardContent className="flex justify-between p-0">
          {/* ESQUERDA   */}
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Carrinho de Chromebook</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/FRENTE LA SALLE.png" />
              </Avatar>
              <p className="border-r-2 border-solid px-1 text-sm">
                Faculdade La Salle
              </p>
              <p className="px-2">301C</p>
            </div>
          </div>
          {/* DIREITA */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">05</p>
            <p className="text=sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookingItem
