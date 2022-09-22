/*Даны две строки. Сравнить строки. Вывести символы большей строки, на количество которых отличается.
Input: ("text education part 2", "text education")
Output: " part 2"*/

function dif(str1, str2){
    let resStr = ""
    if (str1.length > str2.length) {
        resStr = str1.slice(str2.length, str1.length)
    } else resStr = str1.slice(str1.length, str2.length)

    return resStr
}

console.log(dif("text education part 2", "text education"));