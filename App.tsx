import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import {
  getMessaging,
  getToken,
  onMessage,
} from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from 'react-native-notify-kit';

const CHANNEL_ID = 'high_importance';

const App = () => {
  useEffect(() => {
    const init = async () => {
      const allowed = await requestNotificationPermissionAndroid();
      if (allowed) {
        await getFCMToken();
        await createChannel();
      }
    };
    init();

    // Recieve foreground messages
    const unsubscribe = onMessage(getMessaging(), async remoteMessage => {
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: CHANNEL_ID,
          pressAction: { id: 'default' },
        },
      });
    });
    return unsubscribe;
  }, []);

  // Permission asking for Android 13 and above
  const requestNotificationPermissionAndroid = async (): Promise<boolean> => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      // only need the permission above android 13 -> API level 33
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Notification permission denied');
        return false;
      }
    }
    return true;
  };

  // Get FCM token
  async function getFCMToken() {
    try {
      const token = await getToken(getMessaging());
      console.log('FCM Token :', token);
    } catch (error) {
      console.log('Error fetching FCM token:', error);
    }
  }

  const createChannel = async () => {
    await notifee.createChannel({
      id: CHANNEL_ID,
      name: 'Important notifications',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });
  };

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
