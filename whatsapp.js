const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const
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

const KirimPesan = async (nohp, pesan) => {
  try {

  } catch (err) {
    console.log(err);
  }
}
