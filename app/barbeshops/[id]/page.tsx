import { db } from "@/app/_lib/prisma"
import { Button } from "@/app/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BarbeshopPageProps {
  params: {
    id: string
  }
}

const BarbeshopPage = async ({ params }: BarbeshopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  })
  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop.name}
          src={barbershop?.imageUrl}
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
      </div>
    </div>
  )
}

export default BarbeshopPage
