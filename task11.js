/*
Дана строка. Написать функцию, которая определит, содержит ли строка только символы 'a', 'b', 'c' или нет.
Input: "abcbacabcbcabcbaba"
Output: true
Input: "abcbacabcqbcabcbnaba"
Output: false
*/

const sourceCode = str => {
    arr = str.split("")
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== "a" && arr[i] !== "b" && arr[i] !== "c") {
            return false
        }
    }

    return true
}

console.log(sourceCode( "abcbacabcbcabcbaba"));
