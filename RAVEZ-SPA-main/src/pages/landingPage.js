import Welcome from '../components/welcome.js';
import Layout from '../layouts/default.js';

export default function LandingPage(root = this.root) {
  const { main } = Layout(root);
 
  Welcome(main)
}

