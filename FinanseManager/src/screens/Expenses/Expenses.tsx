import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {colors} from "../../constans/colors";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import React, {useMemo, useState} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/RootStackParamList";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getFilterExpensesByCategory} from "../../utils/getFilterExpensesByCategory";
import ArrowBottom from "../../../assets/ArrowDown.svg";
import ArrowTop from "../../../assets/ArrowUp.svg";
import ArrowRight from "../../../assets/ArrowRight.svg";
import {getDate} from "../../utils/getDate";

type ErrorProps = NativeStackScreenProps<RootStackParamList, "Expenses">


const Expenses = ({route}: ErrorProps) => {
    const {id, categoryId} = route.params
    const [isOpenExpense, setIsOpenExpense] = useState(false)
    const allExpenses = useSelector((state: RootState) => state.expenses.allExpenses)
    const categories = useSelector((state: RootState) => state.expenses.categories)

    const filterExpensesByCategory = getFilterExpensesByCategory([...allExpenses], categoryId)
    const getCurrentIndex = () => {
        return filterExpensesByCategory.findIndex((el) => el.id === id)
    }

    const currentIndex = useMemo(() =>getCurrentIndex() ,[filterExpensesByCategory])
    const getCurrentCategory = () => {
        if (!filterExpensesByCategory[0].categoryId) {
            return "без категории"
        }
        const currentCategory = categories.filter((el) => el.id === filterExpensesByCategory[0].categoryId)
        return currentCategory[0].name
    }
    const HEIGHT = (Dimensions.get("window").height - 200)/3

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerBlock}>
                <Text style={styles.headerText}>Транзакции в категории "{getCurrentCategory()}"</Text>
            </View>
            <FlatList
                data={filterExpensesByCategory}
                keyExtractor={(item) => item.id.toString()}
                getItemLayout={(data, index) => (
                    { length: HEIGHT, offset: HEIGHT * index, index }
                )}
                snapToAlignment={"start"}
                snapToInterval={HEIGHT}
                decelerationRate={"fast"}
                maxToRenderPerBatch={15}
                ListHeaderComponent={<View style={{ height: HEIGHT }} />}
                ListFooterComponent={<View style={{ height: HEIGHT }} />}
                viewabilityConfig={{
                    minimumViewTime: 10,
                    itemVisiblePercentThreshold: 100,
                    waitForInteraction: false,
                }}
                initialScrollIndex={currentIndex}
                renderItem={({item}) =>
                    <View style={styles.itemWrapper}>
                        <View style={styles.container}>
                            <View style={[styles.arrowBlock, item.isSpent
                                ? styles.arrowBlockRed
                                : styles.arrowBlockGreen]}
                            >
                                {item.isSpent
                                    ? <ArrowBottom/>
                                    : <ArrowTop/>
                                }
                            </View>

                            <TouchableOpacity
                                onPress={() => item.title.length > 14 && setIsOpenExpense(prevState => !prevState)}
                                style={styles.textContainer}
                            >
                                <View style={styles.textBlock}>
                                    {isOpenExpense
                                        ? <Text style={styles.title}>{item.title}</Text>
                                        : <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                                    }
                                    <Text style={item.isSpent ? styles.red : styles.green}>{item.price} ₽</Text>
                                </View>

                                {item.title.length > 14
                                    && (isOpenExpense
                                        ? <ArrowRight style={{transform: [{ rotate: "90deg" }]} } />
                                        : <ArrowRight/> )
                                }
                            </TouchableOpacity>

                            <View style={styles.rightSide}>
                                <Text style={styles.date}>{getDate(item.date)}</Text>
                            </View>
                        </View>
                    </View>

                }
            />

            <BottomNavigation
                route={route.name}
                isButton={false}
            />
        </View>
    );
};

export default Expenses;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.BACKGROUND,
        flex: 1,
        paddingBottom: 100,
    },
    itemWrapper: {
        height: Dimensions.get("window").height/4,
    },
    container: {
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 13,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.BACKGROUND_DATA,
        borderRadius: 25,
    },
    headerBlock: {
        alignItems: "center",
        marginVertical: 20
    },
    headerText: {
        fontSize: 20,
        color: colors.WHITE,
    },
    arrowBlock: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,

    },
    arrowBlockRed: {
        backgroundColor: colors.RED
    },
    arrowBlockGreen: {
        backgroundColor: colors.LIGHT_GREEN
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    textBlock: {
        width: 120,
        marginRight: 10
    },
    title: {
        color: colors.WHITE,
        marginBottom: 2
    },
    red: {
        color: colors.RED
    },
    green: {
        color: colors.LIGHT_GREEN
    },
    date: {
        fontSize: 10,
        color: "#96A7AF",
        marginBottom: 6
    },
    controlButton: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    rightSide: {
        alignItems: "center"
    },
    svgBlock: {
        padding: 5
    }
})
