import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
    createChannel,
    Importance,
    Visibility,
    channels 
} from '@tauri-apps/plugin-notification';
// await createChannel({
//   id: 'messages',
//   name: 'Messages',
//   description: 'Notifications for new messages',
//   importance: Importance.High,
//   visibility: Visibility.Private,
//   lights: true,
//   lightColor: '#ff0000',
//   vibration: true,
//   sound: 'notification_sound'
// });
export async function sendANotification() {
  const existingChannels = await channels();
  console.log('Existing channels:', existingChannels);

    let permissionGranted = await isPermissionGranted();

    // If not we need to request it
    if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === 'granted';
    }

    // Once permission has been granted we can send the notification
    if (permissionGranted) {

        sendNotification({ title: 'Tauri', body: 'Tauri is awesome!' ,channelId: 'messages',});
      
        
    }
}
