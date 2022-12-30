import {IExpense} from "../interface/interface";

export const getFilterExpensesByDate = (allExpenses : IExpense[], date: Date)  => {
    const filterDate = date.toLocaleDateString().split(".").slice(1,3)
    return allExpenses.filter((el) => {
        const elDate = el.date.toLocaleDateString().split(".").slice(1, 3)
        return elDate[0] === filterDate[0] && elDate[1] === filterDate[1]
    })
}