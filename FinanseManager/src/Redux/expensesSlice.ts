import {createSlice} from "@reduxjs/toolkit";
import {ICategories, IExpense, IExpenses} from "../interface/interface";



const expenses: IExpenses = {
    allExpenses: [],
    categories: [],
    tableId: ""
}


const expensesSlice = createSlice({
    name: "expenses",
    initialState: expenses,
    reducers: {
        saveTableId(state, action) {
            state.tableId = action.payload.tableId
        },
        saveAllExpenses(state, action) {
            state.allExpenses = action.payload.filterExpense
        },
        saveAllCategories(state, action) {
            state.categories = action.payload.filterCategories
        },
        addCategoryAction(state, action) {
            state.categories.push(action.payload.category)
        },
        removeCategoryAction(state, action) {
            state.categories = state.categories.filter((el : ICategories) => el.id !== action.payload.id && el.name)
        },
        removeExpenseAction(state, action) {
            state.allExpenses = state.allExpenses.filter((el: IExpense) => el.id !== action.payload.id && el.title)
        }
    }
})

export const {saveTableId, saveAllExpenses, saveAllCategories, removeCategoryAction, removeExpenseAction} = expensesSlice.actions;

export default expensesSlice.reducer