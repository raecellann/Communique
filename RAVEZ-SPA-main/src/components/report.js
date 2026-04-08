import cssLoader from "../utility/cssLoader";

export default async function Report(root) {
  console.log(localStorage.getItem('account_id'));

  root.innerHTML = `
      <div id="container">
          <button id="reportBtn">Report</button>

          <div id="popupOverlay" class="overlay">
              <div class="popup">
                  <div class="popup-header">
                      <div class="notifier">
                          <span>You already reported this Thread.</span>
                      </div>
                      <button id="closePopup">Cancel</button>
                  </div>
                  <h1>What type of issue are you<br> reporting?</h1>
                  <div class="popup-content">
                      <div class="container-1">
                          <label class="option">
                              <span>Bullying and Harassment</span>
                          </label>
                          <div class="paragraph-for-BH">
                              <p>Report any instances of threatening, abusive, or harmful behavior, including cyberbullying, personal attacks, and harassment, to help us create a safer environment for everyone.</p>
                              <input type="checkbox" name="issue" value="Bullying and Harassment">
                          </div>
                      </div>

                      <div class="container-2">
                          <label class="option">
                              <span>Sexuality and Nudity</span>
                          </label>
                          <div class="paragraph-for-SN">
                              <p>Report any content that contains explicit sexual material, nudity, or inappropriate sexual conduct to ensure a respectful and safe community.</p>
                              <input type="checkbox" name="issue" value="Sexuality and Nudity">
                          </div>
                      </div>

                      <div class="container-3">
                          <label class="option">
                              <span>False Information</span>
                          </label>
                          <div class="paragraph-for-FI">
                              <p>Report any misleading or false information, including fake news, misinformation, or deceptive content, to help maintain the integrity and reliability of our platform.</p>
                              <input type="checkbox" name="issue" value="False Information">
                          </div>
                      </div>
                  </div>
                  <div class="popup-footer">
                      <button id="Submitbtn">Submit</button>
                  </div>
              </div>
          </div>

          <!-- Success popup -->
          <div id="successPopup" class="overlay" style="display: none;">
              <div class="popup">
                <h1>Report Submitted</h1>

                <p class="thank-you-message">Thanks for helping make Communiqué better for everyone.</p>
                <p>We know it wasn’t easy, so we appreciate you taking the time to answer those questions.</p>
                <button id="doneBtn">Done</button>

          </div>
      </div>
  `;

  // Get elements
  const reportBtn = root.querySelector('#reportBtn');
  const popupOverlay = root.querySelector('#popupOverlay');
  const closePopup = root.querySelector('#closePopup');
  const submitBtn = root.querySelector('#Submitbtn');
  const successPopup = root.querySelector('#successPopup');
  const doneBtn = root.querySelector('#doneBtn');

  // Show main report popup
  reportBtn.addEventListener('click', () => {
      popupOverlay.style.display = 'flex';
  });

  // Hide main report popup
  closePopup.addEventListener('click', () => {
      popupOverlay.style.display = 'none';
  });

  // Show success popup on submit
  submitBtn.addEventListener('click', () => {
      popupOverlay.style.display = 'none'; // Hide the report popup
      successPopup.style.display = 'flex'; // Show the success popup
  });

  // Close success popup
  doneBtn.addEventListener('click', () => {
      successPopup.style.display = 'none';
  });
}
