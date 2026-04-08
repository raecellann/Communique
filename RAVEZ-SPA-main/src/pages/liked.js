import Navigation from '../components/navigation.js';
import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';

export default async function Liked() {
  const { navigation, main } = Layout(this.root);

  await cssLoader('../styles/navigation.css');
  Navigation(navigation);
}
