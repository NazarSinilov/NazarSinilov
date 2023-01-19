import React from 'react';
import Notification from "./Notification/Notification";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {getNotificationTime, toggleIsNotification} from "../../../redux/userConfigSlice";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {getTime} from "../../../utils/getTime";

const NotificationContainer = () => {
  const dispatch = useDispatch()
  const config = useSelector((state: RootState) => state.config.config)
  const {isNotification, notificationTime} = config

  const toggleSwitchNotification = () => {
    dispatch(toggleIsNotification(!isNotification))
  }
  const onChange = (selectedDate: any) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp)
    dispatch(getNotificationTime({currentDate}))
  };

  const date = new Date(notificationTime)
  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "time",
      is24Hour: true,
    });
  };

  const time = getTime(new Date(notificationTime))
  return (
    <Notification
      isNotification={isNotification}
      toggleSwitchNotification={toggleSwitchNotification}
      showMode={showMode}
      time={time}
    />
  );
};

export default NotificationContainer;