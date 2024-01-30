const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const express = require('express')
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

    await Promise.allSettled(data.map(async (item, index) => {
      try {
        console.log("Mengirim pesan ke " + item.hp_mahasiswa, 'urutan ' + index);
        const nomor = phoneNumberFormatter(item.hp_mahasiswa);
        const media = MessageMedia.fromFilePath('gambar1.jpg');
        await client.sendMessage(nomor, media, {
          caption: formatUmum()
        }).then(async () => {
          console.log("Berhasil Mengirim Pesan");
          await updateStatus(item.id, 'sukses');
        }).catch(async () => {
          console.log("Gagal Mengirim Pesan");
          await updateStatus(item.id, 'gagal');
        });
      } catch (error) {
        await updateStatus(item.id, 'gagal');
      }
    }));
  } catch (error) {
    console.log(error);
  }
}

const Test = async () => {
  try {
    const number = phoneNumberFormatter('085171079687');
    const media = MessageMedia.fromFilePath('gambar1.jpg');
    await client.sendMessage(number, media, {
      caption: formatUmum()
    });
    console.log('success');
  } catch (error) {
    console.log('failed', error);
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
  } catch (error) {
    console.log(error);
  }
});




