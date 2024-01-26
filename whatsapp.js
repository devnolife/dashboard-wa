const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const express = require('express')
const server = express()
const port = 3050;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const {
  phoneNumberFormatter,
  formatUmum
} = require('./utils');


const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ],
  },
  authStrategy: new LocalAuth()
});


const updateStatus = async (id, status) => {
  try {
    await prisma.data_mhs.update({
      where: {
        id: id
      },
      data: {
        status: status,
        chat_terakhir: new Date(Date.now())
      }
    })
  } catch (error) {
    console.log(error);
  }
}

// const Bombers = async () => {
//   try {
//     const data = await prisma.data_mhs.findMany({
//       where: {
//         nama_fakultas: 'AGAMA ISLAM',
//         status: 'belum'
//       },
//       select: {
//         id: true,
//         hp_mahasiswa: true,
//       },
//       take: 1000
//     });

//     await Promise.allSettled(data.map(async (item, index) => {
//       try {
//         console.log("Mengirim pesan ke " + item.hp_mahasiswa, 'urutan ' + index);
//         const nomor = phoneNumberFormatter(item.hp_mahasiswa);
//         const media = MessageMedia.fromFilePath('gambar1.jpg');
//         await client.sendMessage(nomor, media, {
//           caption: formatUmum()
//         });
//         console.log("Berhasil Mengirim Pesan");
//         await updateStatus(item.id, 'sukses');
//       } catch (error) {
//         await updateStatus(item.id, 'gagal');
//         console.log(error);
//       }
//     }));
//   } catch (error) {
//     console.log(error);
//   }
// }

const Bombers = async () => {
  try {
    const data = await prisma.data_mhs.findMany({
      where: {
        nama_fakultas: 'AGAMA ISLAM',
        status: 'belum'
      },
      select: {
        id: true,
        hp_mahasiswa: true,
      },
      take: 1000
    });

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      try {
        console.log("Mengirim pesan ke " + item.hp_mahasiswa, 'urutan ' + index);
        const nomor = phoneNumberFormatter(item.hp_mahasiswa);
        const media = MessageMedia.fromFilePath('gambar1.jpg');
        await client.sendMessage(nomor, media, {
          caption: formatUmum()
        });
        console.log("Berhasil Mengirim Pesan");
        await updateStatus(item.id, 'sukses');
      } catch (error) {
        await updateStatus(item.id, 'gagal');
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const Test = async () => {
  try {
    const phones = ['085757562962', '085298129638', '082271409022'];

    for (const phone of phones) {
      const number = phoneNumberFormatter(phone);
      const media = MessageMedia.fromFilePath('gambar1.jpg');

      await client.sendMessage(number, media, {
        caption: formatUmum()
      });

      console.log(`Successfully sent message to ${phone}`);

      await new Promise(resolve => setTimeout(resolve, 30000));
    }

    console.log('All messages sent successfully');
  } catch (error) {
    console.log('Failed to send messages', error);
  }
}


client.initialize();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});


client.on('authenticated', () => {
  console.log('authenticated', 'Whatsapp is authenticated!');
  console.log('message', 'Whatsapp is authenticated!');

});

client.on('auth_failure', function (session) {
  console.log('message', 'Auth failure, restarting...');
});

client.on('disconnected', (reason) => {
  console.log('Client was logged out', reason);
  client.destroy();
  client.initialize();
});

client.on('ready', async () => {
  try {
    console.log('ready', 'Whatsapp is ready!');
    await Bombers();
    // await Test();
  } catch (error) {
    console.log(error);
  }
});