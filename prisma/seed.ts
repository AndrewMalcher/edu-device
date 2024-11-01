const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function seedEducationalInstitution() {
  try {
    const institution = await prisma.educationalInstitution.create({
      data: {
        name: "Faculdade La Salle",
        address: "Av. Dom Pedro I, 151, Dom Pedro",
        phones: ["(92) 98204-5108", "(92) 99503-2351"],
        description:
          "A Faculdade La Salle é uma instituição de ensino superior renomada, oferecendo diversos cursos de graduação e pós-graduação, com foco em inovação e qualidade educacional.",
        imageUrl:
          "https://www.unilasalle.edu.br/uploads/instituicoes/logo/64b2908d734be567.20180529145105.png",
        services: {
          create: [
            {
              name: "CHROMEBOOKS 05",
              description: "CARRINHO DE CHROMEBOOKS COM 40 UNIDADES",
              imageUrl:
                "https://cdn.dooca.store/14767/products/sam2-1_640x640+fill_ffffff.jpg?v=1660834653&webp=0",
            },
            {
              name: "IPADS 02",
              description: "CARRINHO DE IPADS COM 30 UNIDADES",
              imageUrl:
                "https://images.tcdn.com.br/img/img_prod/167552/ipad_air_2_mh1c2br_a_9_7_16gb_wi_fi_4g_dourado_13983_1_1df0457c411df1b2e3117e7aeae3ceaa.jpg",
            },
            {
              name: "IPADS 03",
              description: "CARRINHO DE IPADS COM 30 UNIDADES",
              imageUrl:
                "https://images.tcdn.com.br/img/img_prod/167552/ipad_air_2_mh1c2br_a_9_7_16gb_wi_fi_4g_dourado_13983_1_1df0457c411df1b2e3117e7aeae3ceaa.jpg",
            },
            {
              name: "CHROMEBOOKS 04",
              description: "CARRINHO DE CHROMEBOOKS COM 40 UNIDADES",
              imageUrl:
                "https://cdn.dooca.store/14767/products/sam2-1_640x640+fill_ffffff.jpg?v=1660834653&webp=0",
            },
            {
              name: "CHROMEBOOKS 06",
              description: "CARRINHO DE CHROMEBOOKS COM 40 UNIDADES",
              imageUrl:
                "https://cdn.dooca.store/14767/products/sam2-1_640x640+fill_ffffff.jpg?v=1660834653&webp=0",
            },
            {
              name: "CHROMEBOOKS 08",
              description: "CARRINHO DE CHROMEBOOKS COM 40 UNIDADES",
              imageUrl:
                "https://cdn.dooca.store/14767/products/sam2-1_640x640+fill_ffffff.jpg?v=1660834653&webp=0",
            },
          ],
        },
      },
    })

    console.log(
      "Faculdade La Salle e serviços inseridos com sucesso:",
      institution,
    )
  } catch (error) {
    console.error("Erro ao inserir dados:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedEducationalInstitution()
