/*В функцию подается несколько массивов. Вернуть один массив со всеми элементами.*/

function deepArray (arr) {
  return arr.flat(Infinity)
}

console.log(deepArray([[[2,4]], [7,"fsf", 8], ['a', 1, 3, 'd']]))