import { db } from "@/app/_lib/prisma"
import { Button } from "@/app/components/ui/button"
import { ChevronLeftIcon, MapPinIcon, MenuIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ServiceItem from "@/app/components/service-item"
import PhoneItem from "@/app/components/phone-item"
import SidebarSheet from "@/app/components/sidebar-sheet"
import { Sheet, SheetTrigger } from "@/app/components/ui/sheet"

interface EducationalInstitutionPageProps {
  params: {
    id: string
  }
}

const EducationalInstitutionPage = async ({
  params,
}: EducationalInstitutionPageProps) => {
  const institution = await db.educationalInstitution.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!institution) {
    return <div>Educational Institution not found</div>
  }

  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={institution.name}
          src={institution.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      {/* TÍTULO DA INSTITUIÇÃO */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{institution.name}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm text-gray-400">{institution.address}</p>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify">{institution.description}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {institution.services.map((service) => (
            <ServiceItem
              key={service.id}
              educationalInstitution={institution}
              service={service}
            />
          ))}
        </div>
      </div>

      {/* CONTATOS */}
      <div className="space-y-3 p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">
          Dúvidas? entre em contato com o setor responsável.
        </h2>

        {institution.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default EducationalInstitutionPage
