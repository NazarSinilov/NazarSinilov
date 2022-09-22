/*Функция принимает в качестве параметра строку. Если она начинается на 'abc', то заменить их на 'www',
иначе добавить в конец строки 'zzz'.
Input: "abctestabctext"
Output: "wwwtestabctext"
Input: "testabctext"
Output: "testabctextzzz"*/

const replaceStr = str => {
    if (str.slice(0, 3) === "abc") {
        return "www" + str.slice(3, str.length)
    } else {
        return str.slice(3, str.length) + "zzz"
    }
}

console.log(replaceStr("testabctext"))