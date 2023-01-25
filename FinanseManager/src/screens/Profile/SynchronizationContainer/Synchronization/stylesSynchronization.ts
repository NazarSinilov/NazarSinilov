import {StyleSheet} from "react-native";
import {colors} from "/constants/colors";

export const styles = StyleSheet.create({
  synchronizationBlock: {
    marginHorizontal: 24,
    flex: 1,
    height: 100,
    backgroundColor: "#286053",
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  synchBackgroundImage: {
    backgroundColor: colors.LIGHT_GREEN,
    width: 58,
    height: 58,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18
  },
  synchTextBlock: {
    flex: 1
  },
  synchTitle: {
    color: colors.LIGHT_GREEN,
    fontSize: 14,
    lineHeight: 23
  },
  synchSubtitle: {
    color: "#3DD59880",
    fontSize: 14,
    lineHeight: 23
  },
  synchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3DD59880",
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.LIGHT_GREEN,
    borderWidth: 2
  }
})
