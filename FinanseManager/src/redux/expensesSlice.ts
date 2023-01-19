import {createSlice} from "@reduxjs/toolkit";
import {ICategories, IExpense, IExpenses} from "../interface/interface";

const expenses: IExpenses = {
  allExpenses: [],
  categories: [],
  tableId: "",
  currentDate: new Date(),
  isShowCalendar: false,
  currentCategories: 0
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
      state.categories = state.categories.filter((el: ICategories) => el.id !== action.payload.id && el.name)
    },
    addExpenseAction(state, action) {
      state.allExpenses.push(action.payload.expense)
    },
    removeExpenseAction(state, action) {
      state.allExpenses = state.allExpenses.filter((el: IExpense) => el.id !== action.payload.id && el.title)
    },
    editExpenseAction(state, action) {
      const replaceIndex = state.allExpenses.findIndex((el: IExpense) => el.id === action.payload.newExpense.id)
      state.allExpenses.splice(replaceIndex, 1, action.payload.newExpense)
    },
    saveCurrentDate(state, action) {
      state.currentDate = action.payload.date
    },
    toggleIsShowCalendar(state) {
      state.isShowCalendar = !state.isShowCalendar
    },
    saveValueCategories(state, action) {
      state.currentCategories = action.payload.valueCategories
    }
  }
})

export const {
  saveTableId,
  saveAllExpenses,
  saveAllCategories,
  removeCategoryAction,
  addExpenseAction,
  removeExpenseAction,
  editExpenseAction,
  saveCurrentDate,
  toggleIsShowCalendar,
  saveValueCategories
} = expensesSlice.actions;

export default expensesSlice.reducer