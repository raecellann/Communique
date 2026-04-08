import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';
import Navigation from '../components/navigation.js';
import Follow from '../components/follow.js';

export default async function follow(root = this.root) {
    const { navigation, main } = Layout(root);
  
    await cssLoader(['../styles/navigation.css','../styles/follow.css']);
  
    Follow(main);
    Navigation(navigation);
  }
  
