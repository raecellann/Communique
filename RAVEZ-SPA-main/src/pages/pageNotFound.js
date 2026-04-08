import Navigation from '../components/navigation.js';
import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';

export default async function PageNotFound() {
  const { navigation, main } = Layout(this.root);
  await cssLoader('../styles/navigation.css');

  Navigation(navigation);
  main.innerHTML = '<h1>Page Not Found</h1>'
}
