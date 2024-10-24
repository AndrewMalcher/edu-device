import { Service } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"

interface ServiceItemProps {
  service: Service
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <div className="flex items-center gap-3">
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
      <div className="space-y-3">
        <h3 className="font-semibold">{service.name}</h3>
        <p className="text-sm text-gray-400">{service.description} </p>
        <div className="flex items-center justify-between">
          <Button variant="secondary" size="sm">
            Reservar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ServiceItem
