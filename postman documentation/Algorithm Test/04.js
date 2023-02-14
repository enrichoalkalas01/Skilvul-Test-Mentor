/*
========================
Recursive: Vocal Reducer
========================

[INSTRUCTIONS]
vocalReducer adalah sebuah function yang menerima satu parameter berupa string.
Function akan memproses string dengan menghilangkan huruf vocal ('a', 'i', 'u', 'e', 'o') baik itu huruf kecil atau huruf besar yang ada di dalam string tersebut.
Function akan mereturn sebuah string tanpa huruf vocal tersebut

[RULE]
- Wajib menggunakan cara recursive.
- Dilarang menambahkan parameter di function DAN membuat variabel di luar function yang telah disediakan.
- Boleh menggunakan method .slice.
- Dilarang menggunakan regex .match dan build in function javascript lainnya!

[EXAMPLE]
input: 'abcdefghij'
proses: kita membuang huruf vocal, dalam string tersebut adalah a, e, i.
output: 'bcdfghj'

input : 'AbC dEf GhI jKl'
proses: kita membuang huruf vocal, dalam string tersebut adalah A, E, I
output: 'bC df Gh jKl'

input: 'phyt'
proses: tidak ada yang dihapus
output: 'phyt'
*/

function vocalReducer(string) {
    // Code here
    if ( !string ) return string
    else if ( 'aiueoAIUEO'.indexOf(string[0]) !== -1 ) return vocalReducer(string.slice(1))
    else return string[0] + vocalReducer(string.slice(1))
}
  
console.log(vocalReducer('abcdefghiiiij')); // 'bcdfghj'
console.log(vocalReducer('phyt')); // 'phyt'
console.log(vocalReducer('AbC dEf GhI jKl')); // 'bC df Gh jKl'
console.log(vocalReducer('INDONESIA MENDAPAT MEDALI EMAS')); // 'NDNS MNDPT MDL MS'