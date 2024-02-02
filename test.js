const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  // Fetch the first 1000 records that match the condition
  const records = await prisma.data_mhs.findMany({
    where: {
      nama_fakultas: {
        not: {
          contains: 'TEKNIK'
        }
      },
      respon: 'negatif'
    },
    take: 1000, // Limit the number of records
    select: {
      id: true // Only select the id field
    }
  });

  const ids = records.map(record => record.id);

  await prisma.data_mhs.updateMany({
    where: {
      id: {
        in: ids // Use the in operator
      }
    },
    data: {
      respon: 'positif'
    }
  });
})();
