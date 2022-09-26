/*
Реализуйте функцию, котора параметром принимает строку. Выведите сформированный объект из параметров строки браузера.
Input: "https://underscorejs.org?a=4&b=8"
Output: { a: 4, b: 8 }
Input: "https://underscorejs.org?id=123&limit=5&offset=0"
Output: { id: 123, limit: 5, offset: 0 }
*/

const parseUrl = str => {
    let obj = {}
    let arr = str.split("?")
    arr.shift()
    arr = arr.join("").split("&")
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split("=")
    }
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i][0]] = arr[i][1]
    }

    return obj
}

console.log(parseUrl("https://underscorejs.org?id=123&limit=5&offset=0"));
