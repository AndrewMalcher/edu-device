import { db } from "../_lib/prisma"
import BarbershopItem from "../components/barbershop-item"
import Header from "../components/header"
import Search from "../components/search"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const educationalinstitutions = await db.educationalInstitution.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="foont-bold mb-3 mt-6 uppercase text-gray-400">
          Resultados para &quot;{searchParams.search}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {educationalinstitutions.map((educationalinstitutions) => (
            <BarbershopItem
              key={educationalinstitutions.id}
              barbershop={educationalinstitutions}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
