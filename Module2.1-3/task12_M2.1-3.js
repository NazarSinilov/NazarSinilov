/*
Дан массив строк. Написать функцию, которы упорядочит массив по длине строк.
Input: ["test", "education", "part", "2", "exceed.team"]
Output: ["2", "part", "test", "education", "exceed.team"]
*/

const sortStrLength = arr => {
    return arr.sort( (a, b) => a.length - b.length)
}

console.log(sortStrLength(    ["test", "education", "part", "2", "exceed.team"]));
