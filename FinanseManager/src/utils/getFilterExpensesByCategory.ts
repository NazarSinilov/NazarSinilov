import {ICategoryItem, IExpense} from "../interface/interface";

export const getFilterExpensesByCategory = (allExpense: IExpense[], category: number, categories: ICategoryItem[] ) => {
    return allExpense.filter((el) => {
        if (category === -1) {
            return el
        }

        return el.categoryId === category
    } )
}
