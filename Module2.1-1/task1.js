/*Даны две строки. Сравнить строки. Вывести символы большей строки, на количество которых отличается.
Input: ("text education part 2", "text education")
Output: " part 2"*/

function dif(str1, str2){
    let resStr = ""
    let lengthStr1 = str1.length
    let lengthStr2 = str2.length
    if (lengthStr1 > lengthStr2) {
        resStr = str1.slice(lengthStr2, lengthStr1)
    } else resStr = str1.slice(lengthStr1, lengthStr2)

    return resStr
}

console.log(dif("text education part 2", "text education"));