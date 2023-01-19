import {StyleSheet} from "react-native";
import {colors} from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    alignItems: "center"
  },
  headerText: {
    color: colors.WHITE,
    fontSize: 24,
    marginVertical: 40
  },
  itemWrapper: {
    paddingHorizontal: 15,
    width: "100%",
    marginBottom: 20
  },
  item: {
    backgroundColor: colors.BACKGROUND_DATA,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    width: "100%"

  },
  itemText: {
    color: colors.WHITE,
    fontSize: 20,
    marginRight: 5
  },
  modalContainer: {
    backgroundColor: colors.LIGHT_GRAY,
    paddingVertical: 20,
    borderRadius: 25,
    position: "absolute",
    bottom: 120,
    left: 15,
    right: 15
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
  shadowText: {
    fontSize: 18
  }

})