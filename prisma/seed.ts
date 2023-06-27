// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
//import userData from "../src/lib/data.json" assert { type: "json" }
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

const user = 'cem';
const password = '1234';

async function generatePasswordHash(password) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error('Error generating password hash:', error);
    throw error;
  }
}

async function main() {
  console.log(`Start seeding ...`)

  const r = await prisma.user.create({
    data: {
      name: user,
      pwhash: await generatePasswordHash(password),
    }
  })
  console.log(`Created user with id: ${r.id}`)
  console.log(`Seeding finished.`)
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
