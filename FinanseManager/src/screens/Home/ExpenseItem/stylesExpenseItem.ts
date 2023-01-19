import {StyleSheet} from "react-native";
import {colors} from "/constants/colors";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.BACKGROUND_DATA,
    borderRadius: 25
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