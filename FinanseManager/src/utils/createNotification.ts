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
    let date = new Date(notificationTime);
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    if (date.getTime() < new Date().getTime()) {
        date = new Date(date.setDate(date.getDate() + 1))
    }
    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
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