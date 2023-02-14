/*

Number Triangle

## Directions

Buatlah sebuah program yang akan menghasilkan suatu pattern berdasarkan `input`.

### Contoh 1

Input: 4

Output:

1
22
333
4444


### Contoh 2

Input: 8

Output:

1
22
333
4444
55555
666666
7777777
88888888

### Contoh 3

Input: 0

Output: `'invalid input'`

## Notes

- Asumsikan `input` selalu memiliki tipe number dari 0 hingga 9.
- Dilarang menggunakan built-in function apapun.
 */

function numberTriangle(number){
    // your code here!
    for ( let i = 1; i <= number; i++ ) {
        let eachLine = ''
        for ( let j = 1; j <= i; j++) {
            eachLine += i + ""
        }
        console.log(eachLine);
    }
}

numberTriangle(4)
numberTriangle(8)
numberTriangle(0)
numberTriangle(3)
numberTriangle(7)