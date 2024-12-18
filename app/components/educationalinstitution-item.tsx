import { EducationalInstitution } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

interface EducationalInstitutionItemProps {
  educationalinstitution: EducationalInstitution
}

const educationalinstitutionItem = ({
  educationalinstitution,
}: EducationalInstitutionItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* imagem */}
        <div className="relative h-[159px] w-full">
          <Image
            alt={educationalinstitution.name}
            fill
            className="object-fit rounded-2xl"
            src={educationalinstitution.imageUrl}
          />
        </div>

        {/* TEXTO */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">
            {educationalinstitution.name}
          </h3>
          <p className="truncate text-sm text-gray-400">
            {educationalinstitution.address}
          </p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/institutions/${educationalinstitution.id}`}>
              Ver Serviços
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default educationalinstitutionItem
