import {StyleSheet} from "react-native";
import {colors} from "/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    justifyContent: "center",
    alignItems: "center"
  },
  textError: {
    fontWeight: "700",
    color: "white",
    fontSize: 34
  }
})