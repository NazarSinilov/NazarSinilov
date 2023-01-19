import {StyleSheet} from "react-native";
import {colors} from "../../../constants/colors";

export const styles = StyleSheet.create({
  userBlock: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: colors.BACKGROUND_DATA,
  },
  userTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 14
  },
  backgroundUserInfo: {
    paddingHorizontal: 16,
    width: "100%",
    height: 42,
    borderRadius: 12,
    justifyContent: "center"
  },
  backgroundName: {
    backgroundColor: colors.BACKGROUND,
  },
  backgroundEmail: {
    backgroundColor: colors.LIGHT_GRAY,
  },
  userName: {
    color: "#96A7AF",
    fontSize: 20,
  },
})
