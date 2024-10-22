import { BarbershopService } from "@prisma/client"

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return <h1>{service.name}</h1>
}

export default ServiceItem
