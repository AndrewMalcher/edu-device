import EducationalInstitutionItem from "../components/educationalinstitution-item"
import Header from "../components/header"
import Search from "../components/search"
import { db } from "../_lib/prisma"

interface EducationalInstitutionsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const EducationalInstitutionsPage = async ({
  searchParams,
}: EducationalInstitutionsPageProps) => {
  const institutions = await db.educationalInstitution.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div>
      {/* HEADER */}
      <Header />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="mx-auto max-w-[1440px] px-4 md:px-8">
        {/* BUSCA */}
        <div className="my-6">
          <Search />
        </div>

        {/* RESULTADOS */}
        <div>
          <h2 className="mb-3 text-lg font-bold uppercase text-gray-500">
            Resultados para &quot;{searchParams?.title || searchParams?.service}
            &quot;
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {institutions.map((institution) => (
              <EducationalInstitutionItem
                key={institution.id}
                educationalinstitution={institution}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default EducationalInstitutionsPage
