/* 
Humanize Date Format

Directions :
Buatlah sebuah program yang akan melakukan konversi 3 buah variable dengan tipe `number` yaitu `date`, `month` dan `year` menjadi sebuah `string`.

### Contoh 1

Input: `date` = `11`, `month` = `10`, `year` = `1999`

Output: `'11-October-1999'`

### Contoh 2

Input: `date` = `5`, `month` = `5`, `year` = `2010`

Output: `'05-May-2010'`

## Notes

- Apabila nilai `date`, `month` atau `year` memiliki tipe selain `number`, tampilkan `'invalid type'`.
- Apabila nilai `date`, `month` atau `year` adalah kosong, tampilkan `'empty data'`.
- Apabila nilai `date` memiliki tipe `number`, asumsikan nilainya selalu di antara `1` hingga `31` (inclusive).
- Apabila nilai `year` memiliki tipe `number`, asumsikan nilainya selalu `1` ke atas.
- Nama bulan yang digunakan adalah dalam bahasa Inggris.
- Dilarang menggunakan built-in function apapun.
*/

function humanizeDateFormat(date, month, year){
    // Your code here
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    if ( typeof date === 'string' || typeof year === 'string' || typeof month === 'string' ) return "Invalid Type"
    if ( !Number(date) || !Number(year) || !Number(month) ) return "Empty Data"
    if ( (Number(date) >= 1 && Number(date) <= 31) || (Number(year) > 1) ) return `${ date }-${ monthNames[month - 1] }-${ year }`
            
}

console.log(humanizeDateFormat(1,1,1985)) // output = 01-January-1985
console.log(humanizeDateFormat(5,12,2020)) // output = 05-December-2020
console.log(humanizeDateFormat(20,5,2020)) // output = 20-Mei-2020