import Layout from '../layouts/default.js';
import cssLoader from '../utility/cssLoader.js';
import Navigation from '../components/navigation.js';
import Followers from '../components/followers.js'; 

export default async function followers(root = this.root) {
    const { navigation, main } = Layout(root);

    await cssLoader(['../styles/navigation.css', '../styles/follow.css']);

    Followers(main);
    Navigation(navigation);

    const followingButton = navigation.querySelector('.nav-button.active:nth-child(1)'); // Assuming the "Following" button is the first one

    // followingButton.addEventListener('click', () => {
    //     main.innerHTML = ''; 
    //     Follow(main); 
    // });
}
