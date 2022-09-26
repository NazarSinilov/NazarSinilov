/*
Написать функцию, которая отсортирует массив чисел по возрастанию (asc) или убыванию (desc).
Input: [6, 43, -6, 3, 0, 5, 2, 7]
Output: [-6, 0, 2, 3, 5, 6, 7, 43]
Input: [6, 43, -6, 3, 0, 5, 2, 7]
Output: [43, 7, 6, 5, 3, 2, 0, -6]
Пример использования:
const sortElements = (arr, direction) => {
  // ....
}*/

const sortElements = (arr, direction) => {
    if (direction === "asc") {
        for (let j = arr.length - 1; j > 0; j--) {
            for (let i = 0; i < j; i++) {
                if (arr[i] > arr[i + 1]) {
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                }
            }
        }
    } else {
        for (let j = arr.length - 1; j > 0; j--) {
            for (let i = 0; i < j; i++) {
                if (arr[i] < arr[i + 1]) {
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                }
            }
        }
    }


    return arr
}

console.log(sortElements([6, 43, -6, 3, 0, 5, 2, 7], "desc"))