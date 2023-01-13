import {LineChart} from "react-native-chart-kit";
import React from "react";
import {Dimensions} from "react-native";
import {IExpense} from "../../../interface/interface";

interface GraphProps {
    filterExpensesByDate: IExpense[]
}

const Graph = ({filterExpensesByDate} : GraphProps) => {
    const screenWidth = Dimensions.get("window").width;
    const getLabelsData = () => {
        const days = new Date().getDate()
        const arrDays = []
        for (let i = 1; i < days + 1; i++) {
            arrDays.push(i.toString())
        }
        return arrDays
    }

    const labelsData = getLabelsData()
    const getArrSpent = () => {
        const arrSpent = Array(new Date().getDate()).fill(0)

        for (let i = 0; i < filterExpensesByDate.length; i++) {
            if (filterExpensesByDate[i].isSpent) {
                const spentDay = new Date(filterExpensesByDate[i].date).getDate() - 1
                arrSpent[spentDay] = arrSpent[spentDay] + filterExpensesByDate[i].price
            }
        }
        return arrSpent
    }

    const arrDays = getArrSpent()
    const data = {
        labels: labelsData,
        datasets: [
            {
                data: arrDays,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2
            }
        ],
        legend: ["Расходы за текущий месяц"]
    };
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    return (
        <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
        />
    );
};

export default Graph;