const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const {
  phoneNumberFormatter,
  formatUmum,
  formatBaru
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

const Test = async () => {
  try {
    const nomor = phoneNumberFormatter('085171079687');
    const media = MessageMedia.fromFilePath('gambar1.jpg');
    await client.sendMessage(nomor, media, {
      caption: formatBaru()
    });
    console.log('Berhasil Mengirim Pesan');

  } catch (error) {
    console.log(error);
  }
}

const Bombers = async () => {
  try {
    const data = await prisma.data_mhs.findMany({
      where: {
        nama_fakultas: {
          not: {
            contains: 'TEKNIK'
          }
        },
        status: 'belum'
      },
      select: {
        id: true,
        hp_mahasiswa: true,
      },
      take: 2000
    });


    for (const [index, item] of data.entries()) {
      try {
        console.log(`Mengirim pesan ke ${item.hp_mahasiswa}, urutan ${index}`);
        const nomor = phoneNumberFormatter(item.hp_mahasiswa);
        const media = MessageMedia.fromFilePath('gambar1.jpg');
        await client.sendMessage(nomor, media, {
          caption: formatBaru()
        });
        console.log('Berhasil Mengirim Pesan');
        await updateStatus(item.id, 'sukses');
        await new Promise(resolve => setTimeout(resolve, 30000));
      } catch (error) {
        await updateStatus(item.id, 'gagal');
        console.log(error);
      }
    }
    console.log('Semua pesan terkirim dengan sukses');
  } catch (error) {
    console.log(error);
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
    await Test();
  } catch (error) {
    console.log(error);
  }
});




