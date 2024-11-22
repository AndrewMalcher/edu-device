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
    return <div>Instituição Educacional não encontrada</div>
  }

  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full md:h-[400px]">
        <Image
          alt={institution.name}
          src={institution.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4 md:left-8 md:top-8"
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
              className="absolute right-4 top-4 md:right-8 md:top-8"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      {/* TÍTULO DA INSTITUIÇÃO */}
      <div className="border-b border-solid p-5 md:p-8">
        <h1 className="mb-3 text-xl font-bold md:text-3xl">
          {institution.name}
        </h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm text-gray-400 md:text-base">
            {institution.address}
          </p>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="space-y-2 border-b border-solid p-5 md:p-8">
        <h2 className="text-xs font-bold uppercase text-gray-400 md:text-sm">
          Sobre nós
        </h2>
        <p className="text-justify text-sm md:text-base">
          {institution.description}
        </p>
      </div>

      {/* SERVIÇOS */}
      <div className="space-y-3 border-b border-solid p-5 md:p-8">
        <h2 className="text-xs font-bold uppercase text-gray-400 md:text-sm">
          Serviços
        </h2>
        <div className="grid grid-cols-1 gap-4 space-y-3 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="space-y-3 p-5 md:p-8">
        <h2 className="text-xs font-bold uppercase text-gray-400 md:text-sm">
          Dúvidas? Entre em contato com o setor responsável.
        </h2>

        {institution.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default EducationalInstitutionPage
