/*
Jajan dan menabung

Amir adalah seorang murid sekolah di SD Skilvul.
Setiap harinya, Amir diberikan uang jajan oleh orang tuanya sebesar Rp.10.000,-.

Amir bisa menabung atau membeli makanan di sekolahnya untuk makan siang.
Kita telah diberikan catatan keuangan Amir dalam bentuk text biasa, dan kita diminta membuat Function untuk menghitung jumlah uang tabungan Amir per harinya dan total tabungannya dalam 1 minggu.

*/

function jumlahTabungan(listHarga, history) {
    // Write your code here
    let uangPerHari = 10000

    // Make Object History String
    let newHistory = {}
    history.split('.').map(e => newHistory[e.split('-')[0]] = e.split('-')[1].split(',') )

    // Define & Compare for accumulative price per day
    let totalUang = {}
    for ( let i in newHistory ) {
      totalUang[i] = uangPerHari
      newHistory[i].map( e => listHarga.find(x => { if ( x.nama === e ) totalUang[i] = totalUang[i] - x.harga }) )
    }

    // Create Total Tabungan Here
    let totalUangKeseluruhan = 0
    for ( let i in totalUang ) totalUangKeseluruhan = totalUangKeseluruhan + totalUang[i]
    totalUang["TotalTabungan"] = totalUangKeseluruhan

    // Return For The Same Results
    return totalUang
}
  
const listHargaMakanan = [
  {
    nama: "ayam",
    harga: 5000
  },
  {
    nama: "nasi",
    harga: 2000
  },
  {
    nama: "cola",
    harga: 1000
  },
  {
    nama: "chiki",
    harga: 1500
  },
  {
    nama: "hotdog",
    harga: 3000
  },
  {
    nama: "aqua",
    harga: 2000
  }
]

let historyPembelian = `Senin-ayam,nasi,cola.Selasa-chiki,hotdog.Rabu-ayam,chiki.Kamis-hotdog.Jumat-chiki,cola,nasi`

console.log(jumlahTabungan(listHargaMakanan, historyPembelian))
  /* 
    output
  
    {
      Senin: 2000,
      Selasa: 5500,
      Rabu: 3500,
      Kamis: 7000,
      Jumat: 5500,
      TotalTabungan: 23500
    }
  
  */