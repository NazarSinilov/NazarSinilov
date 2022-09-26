/*Дана строка. Разделите строку на фрагменты по три подряд идущих символа. В каждом фрагменте средний символ заменить
на случайный символ, не совпадающий ни с одним из символов этого фрагмента, например, нижнее подчеркивание (_).
Показать фрагменты, упорядоченные по алфавиту.
Input: "test education part 2"
Output: ["a_i", "d_c", "o_ ", "p_r", "t_2", "t_e", "t_s"]*/

function getFragments(str) {
    let arr = str.split("")
    let arr1 = []
    for (let i = 0; i < arr.length; i += 3) {
        arr1.push(arr.slice(i, i + 3))
    }

    for (let j = arr1.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (arr1[i] > arr1[i + 1]) {
                let temp = arr1[i];
                arr1[i] = arr1[i + 1];
                arr1[i + 1] = temp;
            }
        }
    }

    for (let i = 0; i < arr1.length; i++) {
        arr1[i][1] = "&"
        arr1[i] = arr1[i].join("")
    }

    return arr1
}

console.log(getFragments("test education part 2"));

