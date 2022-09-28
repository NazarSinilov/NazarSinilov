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

    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            if (arr[i] === arr[j]) {
                arr.splice(i, 1)
            }
        }
    }

    return arr
}

console.log(removeDuplicates([4, 7, 1, 9, 6, 8, 4, 6, 3, 6]));