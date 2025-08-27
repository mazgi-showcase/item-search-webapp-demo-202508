import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  const items = [
    {
      id: '01125TAZM85RDKJWKSC9JBRV16',
      text: '(fixed)Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: '01125TAZM8DAD8PQ1XSDTJJZE7',
    },
    {
      id: '01125TAZM8CMN0N04VXMMC0W9J',
    },
    {
      id: '01125TAZM8FW25ZP6T8N306RV5',
    },
    {
      id: '01125TAZM87PPZFB04A98CBZGF',
    },
    {
      id: '01125TAZM8ZPWFBJE8SK8PF4W0',
    },
    {
      id: '01125TAZM8YN2A5X2MVM1GHMKW',
    },
    {
      id: '01125TAZM8KTYFD5NQYZ5D1V7F',
    },
  ].map(
    async (item) =>
      await prisma.items.upsert({
        where: { id: item.id },
        update: {},
        create: { text: faker.lorem.text(), ...item },
      })
  )
  Promise.all(items).then((items) => console.log(items))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
