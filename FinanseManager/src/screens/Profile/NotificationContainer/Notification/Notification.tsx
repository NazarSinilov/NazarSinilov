import {Switch, Text, View} from "react-native";
import Bell from "../../../../../assets/Bell.svg";
import React from "react";
import {styles} from "./stylesNotification";
import {colors} from "../../../../constants/colors";

interface NotificationProps {
  isNotification: boolean
  toggleSwitchNotification: () => void
  showMode: () => void
  time: string
}

const Notification = (props: NotificationProps) => {
  const {isNotification, toggleSwitchNotification, showMode, time} = props

  return (
    <View style={styles.notificationBlock}>
      <View style={styles.enableNotificationBlock}>
        <View style={styles.bellBackground}>
          <Bell/>
        </View>
        <Text style={styles.notificationTitle}>Напоминать ежедневно</Text>
        <Switch
          trackColor={{false: colors.GRAY, true: colors.LIGHT_GREEN}}
          thumbColor={isNotification ? colors.LIGHT_GREEN : colors.GRAY}
          onValueChange={toggleSwitchNotification}
          value={isNotification}
        />
      </View>

      <View style={styles.border}/>
      <View style={isNotification ? styles.timeBlock : [styles.timeBlock, styles.disableTime]}>
        <Text style={styles.timeText}>Время напоминания </Text>
        <View style={styles.backgroundInput}>
          <Text onPress={() => isNotification && showMode()} style={styles.inputTime}>
            {time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Notification;