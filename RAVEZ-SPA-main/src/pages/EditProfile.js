import Navigation from '../components/navigation.js';
import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';
import EditProfile from '../components/editProfile.js';

export default async function EditProfiles() {
    const { navigation, main } = Layout(this.root);
    await cssLoader(['../styles/navigation.css', '../styles/editprofile.css']);
    
    // Display profile and navigation
    EditProfile(main);
    Navigation(navigation);
  }