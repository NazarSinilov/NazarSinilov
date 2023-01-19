import HeaderDate from "./HeaderDate/HeaderDate";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {saveCurrentDate, toggleIsShowCalendar} from "../../../redux/expensesSlice";

const HeaderDateContainer = () => {
  const currentDateString = useSelector((state: RootState) => state.expenses.currentDate)
  const currentDate = new Date(currentDateString)
  const isShowCalendar = useSelector((state: RootState) => state.expenses.isShowCalendar)
  const dispatch = useDispatch()

  const incrementYear = () => {
    const date = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))
    dispatch(saveCurrentDate({date}))
  }
  const decrementYear = () => {
    const date = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
    dispatch(saveCurrentDate({date}))
  }
  const incrementMonth = () => {
    const date = new Date(currentDate.setMonth(currentDate.getMonth() + 1))
    dispatch(saveCurrentDate({date}))
  }
  const decrementMonth = () => {
    const date = new Date(currentDate.setMonth(currentDate.getMonth() - 1))
    dispatch(saveCurrentDate({date}))
  }

  const toggleCalendar = () => {
    dispatch(toggleIsShowCalendar())
  }
  return (
    <HeaderDate
      incrementYear={incrementYear}
      decrementYear={decrementYear}
      incrementMonth={incrementMonth}
      decrementMonth={decrementMonth}
      currentDate={currentDate}
      toggleCalendar={toggleCalendar}
      isShowCalendar={isShowCalendar}
    />
  );
};

export default HeaderDateContainer;