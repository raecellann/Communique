import displayProfile from '../components/displayProfile.js';
import Navigation from '../components/navigation.js';
import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';
import { appsState } from '../layouts/default.js';

export default async function Profile() {
  const { navigation, main } = Layout(this.root);
  await cssLoader(['../styles/navigation.css','../styles/profile.css', '../styles/threadPost.css', '../styles/noThreadPost.css']);
  
  // Display profile and navigation
  displayProfile(main);
  Navigation(navigation);
}