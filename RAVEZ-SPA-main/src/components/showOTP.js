import cssLoader from "../utility/cssLoader";
import showResetPassword from "./showResetPassword.js";

export default function showOTP(root, correctOTP) {  // Accept correct OTP as a parameter
    cssLoader(['../../styles/forgetPassword-second.css']);

    root.innerHTML = `
        <div id="container">
            <main id="main">
                <div class="reset-passw-container">
                    <div class="content">
                        <p class="instructions">Please Enter the correct OTP code</p>
                        <div class="otp-input-container">
                            <input type="text" maxlength="1" class="otp-input" />
                            <input type="text" maxlength="1" class="otp-input" />
                            <input type="text" maxlength="1" class="otp-input" />
                            <input type="text" maxlength="1" class="otp-input" />
                            <input type="text" maxlength="1" class="otp-input" />
                        </div>
                        <div class="button" id="otp-button"> 
                            <span id="otp_btn">Submit</span>
                            <span id="btn_back"></span>
                        </div>             
                    </div>
                </div>
            </main>
        </div>
    `;

    const otpInputs = document.querySelectorAll('.otp-input');
    let enteredOTP = '';

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const currentValue = input.value;

            // For the first input, do not allow '0'
            if (index === 0 && currentValue === '0') {
                input.value = ''; // Clear the input if '0' is typed in the first field
                return;
            }

            // Allow only numeric values
            if (!/^\d$/.test(currentValue)) {
                input.value = ''; // Clear invalid input
                return;
            }

            // Move to the next input if a valid number is entered
            if (currentValue.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }

            // Collect entered OTP
            enteredOTP = enteredOTP + currentValue;
        });

        input.addEventListener('keydown', (e) => {
            // Handle Backspace: Move focus to the previous input
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    // Attach event listener to "Submit" button
    const otpBtn = document.getElementById("otp_btn");

    otpBtn.addEventListener('click', () => {
        if (Number(enteredOTP) !== Number(correctOTP)) {
            // OTP is correct, proceed to the next section
            alert("Incorrect OTP, please try again.");
        } else {
            showResetPassword(root);
        }
        console.log(enteredOTP);

    });
}
