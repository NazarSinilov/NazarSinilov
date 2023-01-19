import {IExpense} from "../interface/interface";

export const getFilterExpensesByDate = (allExpenses: IExpense[], date: Date) => {
  const filterDate = date.toLocaleDateString().split(".").slice(1, 3)
  return allExpenses.filter((el) => {
    const elDate = new Date(el.date)
    const date = elDate.toLocaleDateString().split(".").slice(1, 3)
    return date[0] === filterDate[0] && date[1] === filterDate[1]
  })
}