import Home from "./home";
import LandingPage from "./landingPage";
import Layout from "../layouts/default";

export default function Check() {
    const userLoggedIn = localStorage.getItem('account_id') && localStorage.getItem('token') ? true: false;
   
    if (userLoggedIn) {
        Home(this.root)
    } else {
        LandingPage(this.root)
    }
}

