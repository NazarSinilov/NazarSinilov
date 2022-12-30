import {IExpense} from "../interface/interface";

export const sortExpensesByDate = (expenses: IExpense[]) => {
    return expenses.sort((a: IExpense, b: IExpense) => new Date(b.date).getTime() - new Date(a.date).getTime())
};

