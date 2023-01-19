import {StyleSheet} from "react-native";
import {colors} from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 25,
    backgroundColor: colors.BACKGROUND
  },
  buttonLogin: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 58,
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: 12,
    marginTop: 45

  },
  loginText: {
    fontStyle: "italic",
    fontSize: 16,
    color: "black"
  },
  loginTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "white"
  }
})