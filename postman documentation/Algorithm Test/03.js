/*
******
Cari Student
******

Function studentFinder menerima input berupa string berisi nama-nama student sebuah batch, dipisahkan oleh " " atau ",".
Function ini mengeluarkan output berupa nama student dengan jumlah huruf terpendek.
Apabila ada 2 nama student yang terpendek, maka function akan mengeluarkan nama yang berada di posisi sebelah kiri terlebih dahulu!


[RULES]
  - Dilarang menggunakan built-in function .split
*/

String.prototype.manualSplit = function(breakChar) {
  let templateString = ""
  let splitedArray = []
  for ( let i = 0; i < this.valueOf().length; i++ ) {
    if ( this.valueOf()[i] != breakChar ) {
      templateString += this.valueOf()[i]
      if ( this.valueOf()[ i + 1 ] == breakChar || i == this.valueOf().length - 1 ) {
        splitedArray.push(templateString);
        templateString = "";
      }
    }
  }

  return splitedArray
}

function studentFinder(students) {
  if ( students.includes(' ') ) return students.manualSplit(" ").sort((a, b) => a.length - b.length)[0]
  if ( students.includes(',') ) return students.manualSplit(",").sort((a, b) => a.length - b.length)[0]
}

console.log(studentFinder('Hanif Ranev Tio Tirta Igor Yusril Tia Titania')); // Tio
console.log(studentFinder('Yogi Hengky Trina An Hamzah')); // An
console.log(studentFinder('Huday,Kay,Trisna,Kinan,Hazman')); // Kay