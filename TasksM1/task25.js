/*Написать функцию, принимающую на вход строку, написанную в стиле snake_case и возвращающую эту же строку, но уже в стиле camelCase.
Input: find_and_replace_element_of_array
Output: findAndReplaceElementOfArray*/

function camelCase(str) {
    str = str.split("_")

    for (let i = 1; i < str.length;i++) {
        str[i] = str[i][0].toUpperCase() + str[i].slice(1, str.length)
    }

    return str.join("")
}

console.log(camelCase("find_and_replace_element_of_array"));