import cssLoader from "../utility/cssLoader";
import { navigateTo } from "./navigation";

export default async function displaySignIn(root) {
    await cssLoader('../styles/sign-in.css');

    root.innerHTML = `
        <div class="banner-container">
            <img src="https://res.cloudinary.com/dpxfbom0j/image/upload/v1730295263/Rectangle_3_aufdel.png" alt="">
        </div>
        <div class="form-container">
            <h2>Login to your Account!</h2>
    
            <div class="input-group">
                <input type="email" placeholder="Enter Username Or Email" id="enter-email-username">
            </div>
    
            <div class="input-group password-input">
                <input type="password" id="login-password" placeholder="Enter Password">
            </div>
            <div class="show-password">
                <input type="checkbox" id="show-password-login">
                <label for="show-password-login">Show Password</label>
            </div>
            
            <div class="button-container" id="btn-container">
                
            </div>
            
            <div class="account-section">
                <p>Don't Have An Account?</p>
            </div>
            <div class="sign-up-section">
                <p id="sign-up-paragraph"> </p>
            </div>
        </div>
    `;

    const signUpParagraph = document.getElementById('sign-up-paragraph');
    const buttonContainer = document.getElementById('btn-container');

    signUpParagraph.innerHTML += `
        <a href="/sign-up">Sign up</a> and discover a great amount of new opportunities
    `;

    buttonContainer.innerHTML += `
        <a href="/home" id='login-buton'></a>
        <div class="button" id="login-btn">
            <span id="login_btn">Log In</span>
            <span id="btn_back"></span>
        </div>
        <div class="forgot_button" id="forgot-btn">
            <span id="forgot-pass">Forgot Password?</span>
            <span id="forgot_btn_back"></span>
        </div>
    `;


    const forget_pass = document.getElementById('forgot-pass');

    forget_pass.addEventListener('click', () => {
        navigateTo('/forget-password')
    });






    handleShowPassword();
    document.getElementById('login-btn').addEventListener('click',async () => {
        await handleSignIn()
    })
}

const handleSignIn = async () => {
  

   const API = import.meta.env;

    const usernameMail = document.getElementById('enter-email-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const payload = {
            "username_or_email": usernameMail,
            "password": password,
        }

        const response = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/account/sign-in`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "content-type": 'application/json',
                apikey: API.VITE_API_KEY
            }
        });

        const data = await response.json();
        
        if (data.success) {
            const anchor = document.getElementById('login-buton');

            localStorage.setItem('account_id', data.data.account_id);
            localStorage.setItem('token', data.data.token)

            anchor.click()
        } else {
            alert(data.message)
        }

    } catch(err) {
        console.error(err)
        console.error('API Not Working, Make sure to run your API on localhost secret 😏')
    }
}

const handleShowPassword = () => {
    document.getElementById('show-password-login').addEventListener('change', function() {
        var passwordInput = document.getElementById('login-password');
        if (this.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';  
        }
    });
}
