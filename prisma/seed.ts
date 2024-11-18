const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function seedEducationalInstitution() {
  try {
    const institution = await prisma.educationalInstitution.create({
      data: {
        name: "Virtus Academy",
        address: "Av. Futuro, 1234, Centro, Cidade Fictícia",
        phones: ["(99) 91234-5678", "(99) 98765-4321"],
        description:
          "A Virtus Academy é uma instituição de ensino moderna e inovadora, com foco em formar líderes para o futuro. Oferece uma infraestrutura de ponta e um ambiente acolhedor para estudantes de todas as idades.",
        imageUrl:
          "https://files.oaiusercontent.com/file-ZQ8rJDMPzfqj4wHZMskZMup8?se=2024-11-18T17%3A30%3A21Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Daabcc31e-c621-4f8b-8beb-f72d06867f84.webp&sig=VXWSwpN2Ln/v%2BCC2VWiOXsaNYprhTq98UiXgtCP9dVc%3D", // substitua pelo link da imagem gerada
        services: {
          create: [
            {
              name: "CARRINHO DE NOTEBOOKS 01",
              description: "CARRINHO COM 30 NOTEBOOKS PARA USO EM SALA DE AULA",
              imageUrl:
                "https://files.oaiusercontent.com/file-SKD5Z5bfEekhO2jQfdOYVYT6?se=2024-11-18T17%3A33%3A02Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D86c51856-c1d5-4d48-9818-7157d4259614.webp&sig=RilGwkZKDE3mhqZQ94tOsRiT1RNQA1V6qEpbQndk73I%3D",
            },
            {
              name: "TABLET 01",
              description: "CARRINHO DE TABLETS SAMSUNG COM 25 UNIDADES",
              imageUrl:
                "https://files.oaiusercontent.com/file-1sTVQ3mDsGLVVaIkOkeNtn7m?se=2024-11-18T18%3A00%3A37Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D9233f021-5fe9-435b-ab7b-96d19878339a.webp&sig=FMJOVXk2EwQ5UCKJ3c7yH9UH7nYJiowEQJoRaBA3YCg%3D",
            },
            {
              name: "CHROMEBOOKS 03",
              description: "CARRINHO DE CHROMEBOOKS COM 40 UNIDADES",
              imageUrl:
                "https://cdn.dooca.store/14767/products/sam2-1_640x640+fill_ffffff.jpg?v=1660834653&webp=0",
            },
            {
              name: "IPADS 07",
              description: "CARRINHO DE IPADS COM 20 UNIDADES",
              imageUrl:
                "https://images.tcdn.com.br/img/img_prod/167552/ipad_air_2_mh1c2br_a_9_7_16gb_wi_fi_4g_dourado_13983_1_1df0457c411df1b2e3117e7aeae3ceaa.jpg",
            },
            {
              name: "IPADS 08",
              description: "CARRINHO DE IPADS COM 20 UNIDADES",
              imageUrl:
                "https://images.tcdn.com.br/img/img_prod/167552/ipad_air_2_mh1c2br_a_9_7_16gb_wi_fi_4g_dourado_13983_1_1df0457c411df1b2e3117e7aeae3ceaa.jpg",
            },
            {
              name: "NOTEBOOK 01",
              description: "1 UNIDADE DE NOTEBOOK PARA USO EM SALA DE AULA",
              imageUrl:
                "https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/14-3420/media-gallery/peripherals_laptop_latitude_3420nt_gallery_3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=573&qlt=100,1&resMode=sharp2&size=573,402&chrss=full",
            },
            {
              name: "NOTEBOOK 02",
              description: "1 UNIDADE DE NOTEBOOK PARA USO EM SALA DE AULA",
              imageUrl:
                "https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/14-3420/media-gallery/peripherals_laptop_latitude_3420nt_gallery_3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=573&qlt=100,1&resMode=sharp2&size=573,402&chrss=full",
            },
            {
              name: "NOTEBOOK 03",
              description: "1 UNIDADE DE NOTEBOOK PARA USO EM SALA DE AULA",
              imageUrl:
                "https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/14-3420/media-gallery/peripherals_laptop_latitude_3420nt_gallery_3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=573&qlt=100,1&resMode=sharp2&size=573,402&chrss=full",
            },
          ],
        },
      },
    })

    console.log("Virtus Academy e serviços inseridos com sucesso:", institution)
  } catch (error) {
    console.error("Erro ao inserir dados:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedEducationalInstitution()
