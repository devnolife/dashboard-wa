const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const data = await prisma.data_mhs.findMany({
    where: {
      status: 'belum',
      nama_fakultas: {
        not: {
          contains: 'TEKNIK'
        }
      }
    },
    select: {
      id: true,
      hp_mahasiswa: true,
    },
    take: 2000
  })
  console.log(data);
  // Bombers();
})();
