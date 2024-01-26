
const phoneNumberFormatter = function (number) {
  let formatted = number.replace(/\D/g, '');
  if (formatted.startsWith('0')) {
    formatted = '62' + formatted.substr(1);
  }
  if (!formatted.endsWith('@c.us')) {
    formatted += '@c.us';
  }
  return formatted;
}

const formatUmum = () => {
  let message = `Assalamu'alaikum Warahmatullahi Wabarakatuh..
  
Tabe, Saya *ELLI OSCHAR, M.Pd.I* teman satu group di group whatsapp *ANDALAN Peduli SulSel*. Mohon izin menyapa saudara-saudaraku semoga dalam keadaan sehat wal afiat senantiasa diberi perlindungan oleh Allah Swt.
  
Pada kesempatan ini saya ingin meminta doa restu atas amanah yang diberikan kepada saya sebagai *Calon Anggota DPD RI Dapil Sulawesi Selatan ELLI OSCHAR, M.Pd.I Nomor Urut 11*.
  
Semoga Allah Swt memudahkan & meridhoi perjuangan ini demi kemaslahatan umat & bangsa. Insya Allah Perjuangan Kemanusiaan akan kita lanjutkan di Senayan.
  
*ELLI OSCHAR, M.Pd.I*
Calon Anggota DPD RI Dapil Sulawesi Selatan Nomor Urut *11*

Ayoo… Berkenalan Lebih Dekat Dengan Calon Senator Muda Sulawesi Selatan

https://s.id/ellioschar
  `;
  return message;
}

module.exports = {
  phoneNumberFormatter,
  formatUmum
}
