import Home from './pages/home.js';
import Check from './pages/check.js';
import Liked from './pages/liked.js';
import SignIn from './pages/signIn.js';
import SignUp from './pages/signUp.js';
import Search from './pages/search.js';
import Profile from './pages/profile.js';
import LandingPage from './pages/landingPage.js';
import EditProfiles from './pages/EditProfile.js';
import PageNotFound from './pages/pageNotFound.js';
import follow from './pages/follow.js';
import Followers from './pages/followers.js';
import SPA from './core/spa.js';
import Notifications from './pages/notifs1.js';
import Reports from './pages/report.js';
import EditAvatars from './pages/EditAvatar.js';
// import ForgetPSW from './pages/ForgetPassword.js';
import ForgetPass from './pages/ForgetPassword.js';


import './styles/common.css';


/**
 * Create an instance of SPA
 *
 */
const app = new SPA({
  root: document.getElementById('app'),
  defaultRoute: PageNotFound,
});

app.add('/', Check)

app.add('/landing-page', LandingPage);

app.add('/sign-in', SignIn);

app.add('/sign-up', SignUp);

app.add('/home', Home);

app.add('/search', Search)

// app.add('/liked', Liked)
app.add ('/notifications', Notifications)

app.add('/profile', Profile)

app.add('/follow', follow)

app.add('/followers', Followers)

app.add('/report', Reports)

app.add('/profile/edit-avatar', EditAvatars)

app.add('/profile/edit-profile', EditProfiles)

app.add('/forget-password', ForgetPass)



// app.add('/editProfile', EditProfile)

// Ensure our app is running
app.handleRouteChanges();

