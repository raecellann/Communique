import displaySearch from '../components/displaySearch.js';
import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';
import Navigation from '../components/navigation.js';

export default async function Search(root = this.root) {
  const { navigation, main } = Layout(root);

  await cssLoader(['../styles/navigation.css','../styles/search.css']);

  displaySearch(main)
  Navigation(navigation);
}

