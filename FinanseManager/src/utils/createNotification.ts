import notifee, {RepeatFrequency, TimestampTrigger, TriggerType} from "@notifee/react-native";

export const createNotification = async (isNotification: boolean, notificationTime: Date) => {
  if (isNotification) {
    await notifee.cancelAllNotifications()
    await onCreateTriggerNotification(notificationTime)
  } else {
    await notifee.cancelAllNotifications()
  }
}

async function onCreateTriggerNotification(notificationTime: Date) {
  const date = new Date(notificationTime);
  const newDate = new Date()
  newDate.setHours(date.getHours())
  newDate.setMinutes(date.getMinutes())

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  if (newDate.getTime() < new Date().getTime()) {
    newDate.setDate(newDate.getDate() + 1)
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: newDate.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
  };

  await notifee.createTriggerNotification(
    {
      title: 'Finance manager',
      body: 'Не забудьте добавить расходы!',
      android: {
        channelId: channelId,
      },
    },
    trigger,
  );
}