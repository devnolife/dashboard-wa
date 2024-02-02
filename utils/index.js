
const phoneNumberFormatter = function (number) {
  // Remove dashes from the phone number
  let cleanedNumber = number.replace(/-/g, '');
  let formatted = cleanedNumber.replace(/\D/g, '');

  if (formatted.startsWith('0')) {
    formatted = '62' + formatted.substr(1);
  }
  if (!formatted.endsWith('@c.us')) {
    formatted += '@c.us';
  }

  return formatted;
}

const generateUniqueCode = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeLength = length;
  let uniqueCode = '';

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueCode += characters[randomIndex];
  }

  return uniqueCode;
}

const formatBaru = () => {
  let message = `
  ${generateUniqueCode(15)}
  Assalamu'alaikum Warahmatullahi Wabarakatuh..

  Tabe, Saya *ELLI OSCHAR, M.Pd.I* Ketua Pemuda Muhammadiyah SulSel / Dosen Unismuh Makassar Mohon izin menyapa ki semua semoga dalam keadaan sehat wal afiat senantiasa diberi perlindungan oleh Allah Swt.

  Pada kesempatan ini saya ingin meminta doa restu atas amanah yang diberikan kepada saya sebagai *Calon Anggota DPD RI Dapil Sulawesi Selatan ELLI OSCHAR, M.Pd.I Nomor Urut 11*
  
  Semoga Allah Swt memudahkan & meridhoi perjuangan ini demi kemaslahatan umat & bangsa
  
  *ELLI OSCHAR, M.Pd.I*
  Calon Anggota *DPD RI* Dapil Sulawesi Selatan Nomor Urut *11*
  
  Untuk berkenalan lebih jauh bisa klik dibawah ini😊😊🙏🏻🙏🏻
  
  https://s.id/ellioschar 
  ${generateUniqueCode(15)}
  Terimakasih atas doa dan dukungannya🙏🏻🙏🏻🙏🏻
  `

  return message;
}



const formatUmum = () => {
  let message = `Assalamu'alaikum Warahmatullahi Wabarakatuh..
  
Tabe, Saya *ELLI OSCHAR, M.Pd.I* teman satu group di group whatsapp *ANDALAN Peduli SulSel*. Mohon izin menyapa saudara-saudaraku semoga dalam keadaan sehat wal afiat senantiasa diberi perlindungan oleh Allah Swt.
  
Pada kesempatan ini saya ingin meminta doa restu atas amanah yang diberikan kepada saya sebagai *Calon Anggota DPD RI Dapil Sulawesi Selatan ELLI OSCHAR, M.Pd.I Nomor Urut 11*.
  
Semoga Allah Swt memudahkan & meridhoi perjuangan ini demi kemaslahatan umat & bangsa. Insya Allah Perjuangan Kemanusiaan akan kita lanjutkan di Senayan.
  
*ELLI OSCHAR, M.Pd.I*
Calon Anggota DPD RI Dapil Sulawesi Selatan Nomor Urut *11*

${generateUniqueCode(15)}

Ayoo… Berkenalan Lebih Dekat Dengan Calon Senator Muda Sulawesi Selatan

👉🏻 https://s.id/ellioschar
  `;
  return message;
}

module.exports = {
  phoneNumberFormatter,
  formatUmum,
  formatBaru,
}
