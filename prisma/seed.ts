const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function seedEducationalInstitution() {
  try {
    const institution = await prisma.educationalInstitution.create({
      data: {
        name: "NovaTech Academy Institution Educational",
        address: "Av. Futuro, 5432, Centro, Cidade Fictícia",
        phones: ["(99) 91234-5678", "(99) 98765-4321"],
        description:
          "A NovaTech Academy é uma instituição de ensino moderna e inovadora, com foco em formar líderes para o futuro. Oferece uma infraestrutura de ponta e um ambiente acolhedor para estudantes de todas as idades.",
        imageUrl:
          "https://media.canva.com/v2/image-resize/format:JPG/height:550/quality:92/uri:s3%3A%2F%2Fmedia-private.canva.com%2FLcttc%2FMAGW33Lcttc%2F1%2Fp.jpg/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAAOkZLeWl1GtI2LaisRB-O1ZqbSQloh4ZtYrIF2Zp_KDR&exp=1731991297&osig=AAAAAAAAAAAAAAAAAAAAALcUYYE7BzDJUuwck1GmMeCOXcH4FhOgOUTUn46tr0k5&signer=media-rpc&x-canva-quality=thumbnail_large",
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
            {
              name: "PROJETOR EPSON 01",
              description:
                "1 UNIDADE DE PROJETOR DA MARCA EPSON PARA USO EM SALA DE AULA",
              imageUrl:
                "https://media.canva.com/v2/image-resize/format:JPG/height:550/quality:92/uri:s3%3A%2F%2Fmedia-private.canva.com%2FL14mA%2FMAGW34L14mA%2F1%2Fp.jpg/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAAOONJOoT2IKFINKCDqZBS-2AW-y3lIJj4Oi7BoSvIA7W&exp=1731990525&osig=AAAAAAAAAAAAAAAAAAAAALuGjkBkXA-6dr0LM43LAZjrTi3dMBpdLxcmnfzpk1SG&signer=media-rpc&x-canva-quality=thumbnail_large",
            },
            {
              name: "PROJETOR EPSON 02",
              description:
                "1 UNIDADE DE PROJETOR DA MARCA EPSON PARA USO EM SALA DE AULA",
              imageUrl:
                "https://media.canva.com/v2/image-resize/format:JPG/height:550/quality:92/uri:s3%3A%2F%2Fmedia-private.canva.com%2FL14mA%2FMAGW34L14mA%2F1%2Fp.jpg/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAAOONJOoT2IKFINKCDqZBS-2AW-y3lIJj4Oi7BoSvIA7W&exp=1731990525&osig=AAAAAAAAAAAAAAAAAAAAALuGjkBkXA-6dr0LM43LAZjrTi3dMBpdLxcmnfzpk1SG&signer=media-rpc&x-canva-quality=thumbnail_large",
            },
            {
              name: "PROJETOR EPSON 03",
              description:
                "1 UNIDADE DE PROJETOR DA MARCA EPSON PARA USO EM SALA DE AULA",
              imageUrl:
                "https://media.canva.com/v2/image-resize/format:JPG/height:550/quality:92/uri:s3%3A%2F%2Fmedia-private.canva.com%2FL14mA%2FMAGW34L14mA%2F1%2Fp.jpg/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAAOONJOoT2IKFINKCDqZBS-2AW-y3lIJj4Oi7BoSvIA7W&exp=1731990525&osig=AAAAAAAAAAAAAAAAAAAAALuGjkBkXA-6dr0LM43LAZjrTi3dMBpdLxcmnfzpk1SG&signer=media-rpc&x-canva-quality=thumbnail_large",
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
