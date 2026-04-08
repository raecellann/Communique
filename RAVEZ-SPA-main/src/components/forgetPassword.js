import showOTP from './showOTP.js'; // Import the showOTP function

export default async function ForgetPassword(root) {
    // Update the DOM with the initial content
    root.innerHTML = `
        <div id="app">
            <div id="container">
                <main id="main">
                    <div class="reset-passw-container">
                        <div class="content">
                            <p class="instructions">To reset your password, please enter your email address.</p>
                            <form>
                                <input 
                                    type="email" 
                                    placeholder="Enter Email Address" 
                                    class="email-input" 
                                    required 
                                />
                            </form>
                            <div class="button" id="otp-button">
                                <span id="otp_btn">Send OTP</span>
                                <span id="btn_back"></span>
                            </div>
                            <p class="feedback-message" style="display: none; color: red;"></p>
                        </div>
                    </div>
                </main>
                <footer id="footer"></footer>
            </div>
        </div>
    `;

    const otpBtn = document.getElementById("otp_btn");
    const emailInput = document.querySelector('.email-input');
    const feedbackMessage = document.querySelector('.feedback-message');

    let debounceTimer;

    otpBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();

        if (!email) {
            feedbackMessage.textContent = 'Please enter your email address.';
            feedbackMessage.style.display = 'block';
            return;
        }

        const exists = checkExistedEmail(email);

        if (exists) {
            feedbackMessage.textContent = 'Email exists. OTP sent!';
            feedbackMessage.style.display = 'block';
            feedbackMessage.style.color = 'green';

            const rootElement = document.getElementById('app');
            if (rootElement) {
                // Call the function to show the OTP input fields

                clearTimeout(debounceTimer);
  
                // Set a new debounce timer
                debounceTimer = setTimeout(() => {
                    
                    sendEmail(email);
                }, 3000); // 300ms debounce time (adjust as needed)
            }
        } else {
            feedbackMessage.textContent = 'Email not found in the system.';
            feedbackMessage.style.display = 'block';
            feedbackMessage.style.color = 'red';
        }
    });
}

// Check if email exists in profiles
const checkExistedEmail = async (email) => {
    const API = import.meta.env;

    try {
        const profileResponse = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/account/profiles`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                apikey: API.VITE_API_KEY,
            },
        });

        const profileData = await profileResponse.json();
        const profiles = profileData?.data || [];

        profiles.forEach(profile => {
            if (profile.email === email) {
                console.log(profile.email);
                return profile.email;
            } else {
                return false;
            }
        })

    } catch (error) {
        console.error('Error checking email existence:', error);
        return false;
    }
};


const sendEmail = async (email) => {
    const API = import.meta.env;
    try {
        const response = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/forget-password/send-email/${email}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                apikey: API.VITE_API_KEY,
            },
        });

        const rootElement = document.getElementById('app');
        const data = await response.json();
        console.log(data.data.otp);
        showOTP(rootElement, data.data.otp);
    } catch {
        console.error('Error sending email:', error);
    }
}