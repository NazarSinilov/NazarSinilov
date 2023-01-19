import {StyleSheet} from "react-native";
import {colors} from "/constants/colors";

export const styles = StyleSheet.create({
    monthsListContainer: {
        backgroundColor: colors.LIGHT_GRAY,
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
        marginBottom: 10
    },
    monthsList: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
})
