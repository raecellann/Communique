import Layout from '../layouts/default.js';
import displaySignUp from '../components/displaySignUp.js';

export default function SignUp() {
  
  const { main } = Layout(this.root);

  displaySignUp(main)
}
