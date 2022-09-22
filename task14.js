/*Даны две строки. Напишите функцию, которая определит, содержится ли меньшая по длине строка в большей.
Input: ("text education part 2", "text")
Output: true
Input: ("text education part 2", "test")
Output: false
}*/

function isShortStr(strLong, strShort) {
    for (let i = 0; i < strLong.length; i++) {
        if (strLong.slice(i, i + strShort.length) === strShort) return true
    }
    return false
}

console.log(isShortStr("text education part 2", "text"));
