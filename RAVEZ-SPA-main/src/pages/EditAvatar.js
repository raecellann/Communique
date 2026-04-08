import Navigation from '../components/navigation.js';
import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';
import EditAvatar from '../components/editAvatar.js';

export default async function EditAvatars() {
    const { navigation, main } = Layout(this.root);
    await cssLoader(['../styles/navigation.css', '../../styles/editavatar.css']);
    
    // Display profile and navigation
    EditAvatar(main);
    Navigation(navigation);
  }