/*Дана строка. Вывести первые три символа и последние три символа, если длина строки больше 5. Иначе вывести первый символ столько раз, какова длина строки.
Input: "test education part 2"
Output: "test 2"
Input: "text"
Output: "tttt"*/

const getThreeLit = str => {
    if (str.length > 5) {
        return str.slice(0, 3) + str.slice(str.length - 3, str.length)
    } else {
        let resStr = ""
        for (let i = 0; i < str.length; i++) {
            resStr += str[0]
        }
        return resStr
    }
}

console.log(getThreeLit("text"))