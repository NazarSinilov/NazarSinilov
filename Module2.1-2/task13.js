/*
Напишите функцию, которая преобразует массив вида let arr = [
{ name: 'width', value: 300 },
{ name: 'height', value: 100 } ];
в объект let obj = { width: 300, height: 100 };
Количество объектов в массиве неограниченно.
Input: [
  {name: "width", value: 300},
  {name: "height", value: 100}
];
Output: {width: 300, height: 100}
*/

const combineKeys = arr => {
    let obj = {}
    for(let i = 0; i < arr.length; i++) {
        let a = arr[i]
        let flag = true
        let count = ""
        for (let key in a) {
            if (flag) {
                count = a[key]
                flag = false
            } else {
                obj[count] = a[key]
            }
        }
    }
    
    return obj
}

console.log(combineKeys(  [
    {name: "width", value: 300},
    {name: "height", value: 100}
]));
