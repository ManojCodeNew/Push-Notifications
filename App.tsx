import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { getMessaging } from '@react-native-firebase/messaging';
import { getToken } from '@react-native-firebase/app/dist/module/internal/web/firebaseAppCheck';

const App = () => {
  useEffect(() => {
    requestNotificationPermissionAndroid();
  }, []);

  // Permission asking for Android 13 and above
  const requestNotificationPermissionAndroid = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      // only need the permission above android 13 -> API level 33
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Notification permission denied');
        return;
      }

      try {
        const messaging = getMessaging();
        const token = await getToken(messaging);
        console.log('FCM Token', token);
      } catch (error) {
        console.error('Error fetching FCM token:', error);
      }
    }
  };

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
