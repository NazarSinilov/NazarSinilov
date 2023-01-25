import {StyleSheet} from "react-native";
import {colors} from "/constants/colors";

export const styles = StyleSheet.create({
  itemBlock: {
    width: 100,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  activeItem: {
    backgroundColor: colors.BACKGROUND_DATA
  },
  itemText: {
    fontSize: 16,
    color: "white"
  }
})