import {StyleSheet} from "react-native";
import {colors} from "../../../constants/colors";

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.LIGHT_GRAY,
    paddingVertical: 10,
    borderRadius: 25,
    position: "absolute",
    bottom: 110,
    left: 15,
    right: 15,
    zIndex: 10001,

  },
  spentBlock: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  expenseBlock: {
    flexDirection: "row",
    alignItems: "center"
  },
  expenseBackgroundIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundRed: {
    backgroundColor: colors.RED
  },
  backgroundGreen: {
    backgroundColor: colors.LIGHT_GREEN
  },
  disabled: {
    opacity: 0.5
  },
  textModal: {
    color: colors.WHITE,
    fontSize: 16
  },
  border: {
    borderBottomWidth: 5,
    borderBottomColor: "#8d9695"
  },
  textInput: {
    backgroundColor: colors.BACKGROUND,
    padding: 10,
    marginHorizontal: 22,
    marginVertical: 10,
    borderRadius: 12
  },
  buttonSave: {
    backgroundColor: colors.LIGHT_GREEN,
    marginVertical: 10,
    borderRadius: 12,
    marginHorizontal: 22,
    paddingVertical: 14,
    alignItems: "center"
  },
  buttonText: {
    color: colors.BLACK,
    fontSize: 16
  },
})
