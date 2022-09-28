/*Реализуйте функцию, которая параметрами принимает два объекта и возвращает сообщение равны ли эти два объекта.
Input:
const a = { test: 8, text: 9 };
const b = { test: 8, text: 9 };
func(a, b)
Output: true
}*/

const a = { test: 8, text: 9, a : 5 };
const b = { test: 8, text: 7, a : 5 };

function isEqual(objA, objB) {
    const keysA = Object.keys(objA)
    const keysB = Object.keys(objA)

    if (keysA.length !== keysB.length) {
        return false
    }

    for (let i = 0; i < keysA.length; i++) {
        if (objB[keysA[i]]) {
            if (objA[keysA[i]] !== objB[keysA[i]]) {
                return false
            }
        }
    }

    return true
}

console.log(  isEqual(a , b));
