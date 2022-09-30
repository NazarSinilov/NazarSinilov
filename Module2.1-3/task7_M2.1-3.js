/*
Дано число. Сложите его цифры. Если сумма получилась более 9-ти, опять сложите его цифры.
И так, пока сумма не станет однозначным числом (9 и менее).
Input: 345
Output: 3
*/

const sumNum = num => {
    let resNum = 0
    let str = "" + num
    let arr = str.split("")
    for (let i = 0; i < arr.length; i++) {
        resNum += +arr[i]
    }
    if (resNum > 9) {
        return sumNum(resNum)
    }

    return resNum
}

console.log(sumNum(345));