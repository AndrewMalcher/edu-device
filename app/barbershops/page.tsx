import { db } from "../_lib/prisma"
import EducationalInstitutionItem from "../components/educationalinstitution-item"

// Adjust the import path as necessary

interface educationalInstitutionPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({
  searchParams,
}: educationalInstitutionPageProps) => {
  const educationalInstitution = await db.educationalInstitution.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  })
  return
  ;<div>
    <h2>Resultados para &quot;${searchParams?.search}&quot;</h2>
    <div>
      {educationalInstitution.map((educationalInstitution) => (
        <EducationalInstitutionItem
          key={educationalInstitution.id}
          educationalinstitution={educationalInstitution}
        />
      ))}
    </div>
  </div>
}

export default BarbershopsPage
