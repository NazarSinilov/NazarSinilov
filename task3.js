/*Напишите функцию removeDuplicates(arr), которая возвращает массив, в котором удалены повторяющиеся элементы из
массива arr (игнорируйте чувствительность к регистру).
Input: [4, 7, 1, 9, 6, 8, 4, 6, 3, 6]
Output: [4, 7, 1, 9, 6, 8, 3]
Input: ["text", "education", "part", "Text"]
Output: ["text", "education", "part"]*/

function removeDuplicates(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === "string") {
            arr[i] = arr[i].toLowerCase()
        }
    }
    return [...new Set(arr)]
}

console.log(removeDuplicates(["text", "education", "part", "Text"]));