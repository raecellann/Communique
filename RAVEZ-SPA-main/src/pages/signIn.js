import Layout from '../layouts/default.js';
import displaySignIn from '../components/displaySignIn.js';

export default function SignIn() {
  const { main } = Layout(this.root);
  
  displaySignIn(main);
}
