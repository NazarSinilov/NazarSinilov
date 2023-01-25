import {StyleSheet} from "react-native";
import {colors} from "/constants/colors";

export const styles = StyleSheet.create({
  restBlock: {
    backgroundColor: colors.BACKGROUND_DATA,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22
  },
  starBackground: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#FFC542",
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  restText: {
    color: "white",
    fontSize: 18,
    lineHeight: 26,
    width: "70%",
    flex: 1
  },
})