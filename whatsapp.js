const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
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

client.initialize();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Whatsapp Ready!');
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

const updateStatus = async (id, status) => {
  try {
    await prisma.data_mhs.update({
      where: {
        id: id
      },
      data: {
        status: status
      }
    })
  } catch (error) {
    console.log(error);
  }
}

// 1000 = 1 detik
(async () => {
  const Bombers = async () => {
    try {
      const data = await prisma.data_mhs.findMany({
        where: {
          nama_fakultas: 'AGAMA ISLAM',
          status: 'belum'
        },
        select: {
          hp_mahasiswa: true,
        },
        take: 1000
      })
      data.map((item, index) => {
        setTimeout(() => {
          const nomor = phoneNumberFormatter(item.hp_mahasiswa);
          const message = formatUmum();
          client.sendMessage(nomor, message)
            .then(() => {
              updateStatus(item.id, 'sudah');
            }).catch(() => {
              updateStatus(item.id, 'gagal');
            })
        }, index * 1000);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // await Bombers();

  const TestChat = async () => {
    try {
      const number = phoneNumberFormatter('085255113333');
      const message = formatUmum();
      client.sendMessage(number, message)
        .then(() => {
          console.log('success');
        }).catch(() => {
          console.log('error');
        })
    } catch (error) {
      console.log(error);
    }
  }

  await TestChat();

})();



