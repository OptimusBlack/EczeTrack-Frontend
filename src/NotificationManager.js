import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useRef } from 'react';
import { AsyncStorage, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function getNotificationId() {
  return await AsyncStorage.getItem('notification', false);
}


function NotificationManager() {
  // const notificationListener = useRef();
  // const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
      const notificationId = await getNotificationId();
      if(!notificationId)
        setDailyNotification(token);
    });

    /*  // Can use this code (Notification Response Received Handler) to navigate to DailyScreen or WeeklyScreen when Notification is clicked.
        // Not implemented to make sure that the user is authenticated

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification Received:", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification Response Received:", response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
    */
  }, []);

  return null;
}

async function setDailyNotification(expoPushToken) {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder! ",
      subtitle: "Daily Reminder",
      body: 'Fill out the daily input to keep track of your Eczema',
    },
    trigger: {
      hour: 18,
      minute: 0,
      repeats: true
    },
  });

  await AsyncStorage.setItem('notification', notificationId);
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default NotificationManager;