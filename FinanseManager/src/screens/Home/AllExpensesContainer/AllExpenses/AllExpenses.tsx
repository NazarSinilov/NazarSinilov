import {FlatList, RefreshControl} from "react-native";
import ExpenseItem from "../../ExpenseItem/ExpenseItem";
import React from "react";
import {IExpense} from "../../../../interface/interface";
import Loader from "../../../../components/Loader/Loader";

interface AllExpensesProps {
  filterExpensesByCategory: IExpense[]
  isLoading: boolean
  fetchExpenses: () => void
  deleteExpense: (id: number) => void
  editExpense: (item: IExpense) => void
}

const AllExpenses = (props: AllExpensesProps) => {

  const {filterExpensesByCategory, isLoading, fetchExpenses, deleteExpense, editExpense} = props

  if (isLoading) {
    return (
      <Loader/>
    )
  }

  return (
    <FlatList
      data={filterExpensesByCategory}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchExpenses}/>}
      renderItem={({item}) => <ExpenseItem
        item={item}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
      />}
    />
  );
};

export default AllExpenses;