/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging";
import notifee from '@notifee/react-native';

const handleMessage = async () => {
    console.log("BACKGROUND MESSAGE");
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
            channelId,
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
                id: 'default',
            },
        },
    });
};

messaging().setBackgroundMessageHandler(handleMessage);
notifee.onBackgroundEvent(async () => {});

AppRegistry.registerComponent(appName, () => App);
