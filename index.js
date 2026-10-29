/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import notifee from 'react-native-notify-kit';
const CHANNEL_ID = 'high_importance';

setBackgroundMessageHandler(getMessaging(), async remoteMessage => {
  await notifee.displayNotification({
    // id: CHANNEL_ID, // this is notification id to make each notification unique
    // name: 'Important notifications', // it belongs to create channel not in display Notification
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    // importance: AndroidImportance.MIN,  // this also need for channel settings
    android: {
      channelId: CHANNEL_ID,
      // sound: ' default', // it also set it in create channel
      pressAction: { id: 'default' },
      // largeIcon: 'ic_launcher',
    },
  });
});

AppRegistry.registerComponent(appName, () => App);
