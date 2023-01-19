import {StyleSheet} from "react-native";
import {colors} from "/constants/colors";

export const styles = StyleSheet.create({
  notificationBlock: {
    backgroundColor: colors.BACKGROUND_DATA,
    marginBottom: 25
  },
  enableNotificationBlock: {
    paddingVertical: 20,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center"
  },
  bellBackground: {
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
    marginRight: 16
  },
  notificationTitle: {
    color: colors.WHITE,
    fontSize: 18,
    flex: 1
  },
  border: {
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
  },
  timeBlock: {
    paddingHorizontal: 18,
    paddingTop: 5,
    paddingBottom: 23,
  },
  disableTime: {
    opacity: 0.5
  },
  inputTime: {
    color: colors.WHITE,
    fontSize: 20,
  },
  timeText: {
    color: "white",
    fontSize: 18,
  },
  backgroundInput: {
    backgroundColor: "#2A3C44",
    width: "100%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 9,
    paddingVertical: 11
  },
})
