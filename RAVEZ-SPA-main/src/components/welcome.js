import cssLoader from "../utility/cssLoader";

export default async function Welcome(root) {
  await cssLoader('../styles/landing-page.css');

  console.log(localStorage.getItem('account_id'));

  root.innerHTML = `
     <div class="main-container">
        <div class="left-side">
          <div class="logo">
              <img src="../assets/logo.svg" alt="" class="logo">
          </div>
              <div class="top-design">
                  <div class="blue-gradient-container">
                      <img src="../assets/blue_gradient.svg" alt="" class="blue-gradient">
                  </div>
                  <img src="../assets/Linechart.png" alt="" class="top-linechart">
              </div>
              <div class="bottom-design">
                  <img src="../assets/Linechart1.png" alt="Bottom Line Chart" class="bottom-linechart">
              </div>
        </div>
        <div class="right-side">
            <img src="../assets/people.svg" alt="" class="background-image">
        </div>
      </div>
      <div class="center-glass" id="center-gloss">
        <div class="welcome-message">
            <img src="../assets/Landing-Page-Title.svg" alt="Landing Page Title">
            <p class="welcome-text">Post your thoughts, catch up with friends, and be part of the community—right here, right now.</p>
        </div>
      </div>

        <!-- Button HTML -->
    </div>
  `
  
  const glass =  document.getElementById('center-gloss');

  glass.innerHTML += `
    <a href="/sign-in" id="lets-start-btn">
      <div class="button">
          <span id="get_started">Let's Get Started!</span>
          <span id="btn_back"></span>
      </div>
    </a>
  `
}
