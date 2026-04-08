import cssLoader from "../utility/cssLoader";

export default async function displaySignUp(root) {

    await cssLoader('../styles/sign-up.css');

    root.innerHTML = `
        <div class="banner-container">
            <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1730295263/Rectangle_3_aufdel.png" alt="">
        </div>
    
        <div class="form-container">
            <h2>Create your First Account!</h2>
            
            <!-- New input field for username and gender selection -->
            <div class="input-group username-gender-group">
                <input type="text" placeholder="Enter Username" id="create-username">
                <select id="gender-select">
                    <option value="" disabled selected>Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
    
            <!-- New input group for Email -->
            <div class="input-group">
                <input type="email" placeholder="Enter Email" id="create-email">
            </div>
    
            <div class="input-group">
                <input type="password" id="create-password" placeholder="Enter Password">
            </div>
            <div class="show-password">
                <input type="checkbox" id="show-password-create">
                <label for="show-password-create">Show Password</label>
            </div>
            <div class="button">
                <span id="create-acc">Create Account</span>
                <span id="btn_back"></span>
            </div>
            <div class="account-section">
                <p id="sign-up-paragraph"></p>
            </div>
        </div>
    `;

    handleShowPassword();

    const signUpParagraph = document.getElementById('sign-up-paragraph');

    signUpParagraph.innerHTML += `
        Already Have Account? <a href="/sign-in" id="create-acc-anchor">Log in</a>
    `;  

    const createAccountBtn = document.getElementById('create-acc');

    createAccountBtn.addEventListener('click', handleSignUp);
}

const handleSignUp = async () => {

  const API = import.meta.env;

  
  try {
    const payload = {
        "username": document.querySelector('#create-username').value,
        "gender": document.querySelector('#gender-select').value,
        "email": document.querySelector('#create-email').value,
        "password": document.querySelector('#create-password').value 
    }

    console.log(payload);

    const response = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/account/sign-up`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            apikey: API.VITE_API_KEY
        },
        body: JSON.stringify(payload)
    })

    const data = await response.json();

    
    if (data.success) {
        const createAccAnchor = document.getElementById('create-acc-anchor');

        createAccAnchor.click()
    } else {
        alert(data.message)
    }
  } catch(err) {
    console.error(err);
  }

}

const handleShowPassword = () => {
    document.getElementById('show-password-create').addEventListener('change', (event) => {
        const passwordField = document.getElementById('create-password');
        passwordField.type = event.target.checked ? 'text' : 'password';
      });
}