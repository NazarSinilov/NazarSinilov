import AllExpenses from "./AllExpenses/AllExpenses";
import {getFilterExpensesByCategory} from "/utils/getFilterExpensesByCategory";
import {IExpense} from "/interface/interface";
import {
  createGoogleTable,
  getExpensesRequest,
  googleDriveInfo,
  removeExpenseRequest
} from "/api/API";
import {removeExpenseAction, saveAllExpenses, saveTableId} from "/redux/expensesSlice";
import {getSynchronizationTime} from "/redux/userConfigSlice";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavigationProp, useFocusEffect, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "/navigation/RootStackParamList";
import {RootState} from "/redux/store";

interface AllExpensesContainerProps {
  filterExpensesByDate: IExpense[]
  valueCategories: number
  editExpense: (item: IExpense) => void
}

const AllExpensesContainer = ({filterExpensesByDate, valueCategories, editExpense}: AllExpensesContainerProps) => {

  const filterExpensesByCategory = getFilterExpensesByCategory([...filterExpensesByDate], valueCategories)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation<NavigationProp<RootStackParamList, keyof RootStackParamList>>();
  const allExpenses = useSelector((state: RootState) => state.expenses.allExpenses)

  useEffect(() => {
      tableValidation()
  },[])

  const deleteExpense = async (id: number) => {
    const backup = [...allExpenses]
    try {
      dispatch(removeExpenseAction({id}))
      await removeExpenseRequest(id)
    } catch (err) {
      dispatch(saveAllExpenses({backup}))
      if (err instanceof Error) {
        navigation.navigate("Error", {errorMessage: err.message})
      }
    }
  }

  const fetchExpenses = async () => {
    try {
      setIsLoading(true)
      const response = await getExpensesRequest()
      transformData(response)
      const synchronizationDate = new Date()
      dispatch(getSynchronizationTime({synchronizationDate}))
    } catch (err) {
      if (err instanceof Error) {
        navigation.navigate("Error", {errorMessage: err.message})
      }
    } finally {
      setIsLoading(false)
    }
  }

  const transformData = (arr: string[][]) => {
    const newArr: IExpense[] = !arr ? [] : arr.map((el: string[], index): IExpense => ({
      title: el[0],
      price: +el[1],
      isSpent: el[2] === "TRUE",
      date: new Date(+el[3]),
      categoryId: +el[4],
      id: index + 1
    }))
    const filterExpense = newArr.filter((el) => el.title && el.price)
    dispatch(saveAllExpenses({filterExpense}))
  }

  const tableValidation = async () => {
    const tableId = await checkGoogleDrive()
    dispatch(saveTableId({tableId}))
    if (!tableId) {
      await createTable()
      await tableValidation()
    } else {
      await fetchExpenses()
    }
  }

  const checkGoogleDrive = async () => {
    try {
      const result = await googleDriveInfo()
      if (result) return result[0].id
      else return null
    } catch (err) {
      if (err instanceof Error) {
        navigation.navigate("Error", {errorMessage: err.message})
      }
    }
  }

  const createTable = async () => {
    try {
      await createGoogleTable()
    } catch (err) {
      if (err instanceof Error) {
        navigation.navigate("Error", {errorMessage: err.message})
      }
    }
  }

  return (
    <AllExpenses
      filterExpensesByCategory={filterExpensesByCategory}
      isLoading={isLoading}
      fetchExpenses={fetchExpenses}
      deleteExpense={deleteExpense}
      editExpense={editExpense}
    />
  );
};

export default AllExpensesContainer;