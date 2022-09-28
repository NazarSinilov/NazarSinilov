/*Реализуйте функцию, которая параметрами принимает два объекта и возвращает сообщение равны ли эти два объекта.
Input:
const a = { test: 8, text: 9 };
const b = { test: 8, text: 9 };
func(a, b)
Output: true
}*/

const a = { test: 8, text: 9, a : 5 };
const b = { test: 8, text: 9, a : 5};

function isEqual(objA, objB) {
    let lenObjA = 0
    let lenObjB = 0

    for (let key in objA) {
        if (key) lenObjA++
    }

    for (let key in objB) {
        if (key) lenObjB++
    }

    if (lenObjA !== lenObjB) {
        return false
    }

    const keys = Object.keys(objA)

    for (let i = 0; i < keys.length; i++) {
        if (objB[keys[i]]) {
            if (objA[keys[i]] !== objB[keys[i]]) {
                return false
            }
        }
    }

    return true
}

console.log(  isEqual(a , b));
