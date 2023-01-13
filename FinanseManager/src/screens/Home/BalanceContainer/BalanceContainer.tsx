import Balance from "./Balance/Balance";
import {IExpense} from "../../../interface/interface";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useEffect, useState} from "react";

interface BalanceContainerProps {
    memoExpenses: IExpense[]
    setOpenGraphFunc: () => void
    openGraph: boolean
}


const BalanceContainer = ({memoExpenses, setOpenGraphFunc, openGraph} : BalanceContainerProps) => {

    const [predictBalance, setPredictBalance] = useState(0)

    useEffect(() => {
        balanceEndMonth()
    }, [memoExpenses])

    const isRest = useSelector((state: RootState) => state.config.config.isRest)

    const totalPrice: number = memoExpenses.reduce((acc, el) => {
        if (el.isSpent) {
            return acc - el.price
        } else {
            return acc + el.price
        }
    }, 0)

    const balanceEndMonth = () => {
        const countCurrentDays = new Date().getDate()
        const dayInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1 , 0).getDate()
        const totalIncome: number = memoExpenses.reduce((acc, el) => !el.isSpent? acc + el.price: acc, 0)
        const totalSpent: number = memoExpenses.reduce((acc, el) => el.isSpent ? acc + el.price : acc, 0)
        const spentInDay = totalSpent / countCurrentDays
        const predictSpent = spentInDay * dayInMonth
        const predictBalanceEndMonth = Math.round(totalIncome - predictSpent)
        setPredictBalance(predictBalanceEndMonth)
    }

    return (
        <Balance
            totalPrice={totalPrice}
            isRest={isRest}
            predictBalance={predictBalance}
            setOpenGraphFunc={setOpenGraphFunc}
            openGraph={openGraph}
        />
    );
};

export default BalanceContainer;