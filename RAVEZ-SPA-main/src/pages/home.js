import displayHome from '../components/displayHome.js';
import Navigation from '../components/navigation.js';
import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';


export default async function Home(root = this.root) {
  const { navigation, main } = Layout(root);

  await cssLoader(['../styles/navigation.css','../styles/home.css']);

  displayHome(main)
  Navigation(navigation);
}

