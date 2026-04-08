import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';
import Navigation from '../components/navigation.js';
import Notifications1 from '../components/notifications.js';

export default async function Notifications(root = this.root) {
    const { navigation, main } = Layout(root);
  
    await cssLoader(['../styles/navigation.css','../styles/notifs.css']);
  
    Notifications1(main);
    Navigation(navigation);
  }
  
