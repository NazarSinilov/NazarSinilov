import {ITodo} from "../interface/interface";

export const sortArray = (arr: ITodo[]) => {
    const newArr = arr.sort((a: ITodo, b: ITodo) => a._id < b._id ? 1 : -1)
    return newArr.sort((a, b) => a.isCheck === b.isCheck ? 0 : a.isCheck ? 1 : -1)
}
