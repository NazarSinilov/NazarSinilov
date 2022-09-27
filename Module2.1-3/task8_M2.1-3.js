/*
Реализуйте функцию, которая параметром принимает объект.
Выведите сформированную строку для браузера ('https://underscorejs.org') с параметрами.
Например, { a: 4, b: 8 } => "https://underscorejs.org?a=4&b=8".
Input: ( "https://docs.google.com", { id: "terdh673bb8", limit: 5, offset: 0 } )
Output: "https://docs.google.com?id=terdh673bb8&limit=5&offset=0"
*/

const sumNum = (str, obj) => {
    const arrayParams = []
    for (let key in obj) {
        arrayParams.push([key, "=", obj[key]].join(""))
        arrayParams.push("&")
    }
    arrayParams.pop()

    return str + "?" + arrayParams.join("")
}

console.log(sumNum(    "https://docs.google.com", { id: "terdh673bb8", limit: 5, offset: 0 }));