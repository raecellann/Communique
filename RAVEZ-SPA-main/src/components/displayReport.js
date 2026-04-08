export default async function displayReport(root) {

    root.innerHTML = `
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

    `;

}   