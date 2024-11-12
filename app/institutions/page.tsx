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
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams?.title || searchParams?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {institutions.map((institution) => (
            <EducationalInstitutionItem
              key={institution.id}
              educationalinstitution={institution}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EducationalInstitutionsPage
