/*
Дано число, например 31. Проверьте, что это число не делится ни на одно другое число кроме себя самого и единицы.
То есть в нашем случае нужно проверить, что число 31 не делится на все числа от 2 до 30.
Если число не делится - выведите 'false', а если делится - выведите 'true'.
Input: 31
Output: false
Input: 4
Output: true
 */

const primeNumber = num => {
    for (let i = 2; i < num; i++) {
        if (num % 2 === 0) {
            return true
        }
    }

    return false
}

console.log(primeNumber(2))