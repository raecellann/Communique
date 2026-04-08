// import Navigation from '../components/navigation.js';
import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';
import ForgetPassword from '../components/forgetPassword.js';

export default async function ForgetPass() {
    const { navigation, main } = Layout(this.root);
    await cssLoader(['../../styles/forgetPassword-first.css']);
    
    // Display profile and navigation
    ForgetPassword(main);
    // Navigation(navigation);
  }