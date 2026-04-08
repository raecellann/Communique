import Navigation from '../components/navigation.js';
import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';
import Report from '../components/report.js';

export default async function Reports() {
    const { navigation, main } = Layout(this.root);
    await cssLoader(['../styles/navigation.css', '../styles/report.css']);
    
    // Display profile and navigation
    Report(main);
    Navigation(navigation);
  }