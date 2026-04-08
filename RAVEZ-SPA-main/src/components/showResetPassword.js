import cssLoader from "../utility/cssLoader";

export default function showResetPassword(root) {
    cssLoader(['../../styles/forgetPassword-third.css']);


    root.innerHTML = `
        <div id="container">
            <navigation id="navigation"></navigation>

            <main id="main">
                <div class="reset-passw-container">
                    <div class="content">
                        
                        <form>
                            <div class="password-input-container">
                                <p class="instructions">Password Reset</p>                                
                                <!-- Enter New Password -->
                                <div class="password-group">
                                    <input type="password" placeholder="Enter New Password" class="password-input" id="new-password" required />
                                    <div class="show-password">
                                        <input type="checkbox" id="show-new-password-checkbox" />
                                        <label for="show-new-password-checkbox">Show Password</label>
                                    </div>
                                </div>
                            
                                <!-- Confirm New Password -->
                                <div class="password-group">
                                    <input type="password" placeholder="Confirm New Password" class="password-input" id="confirm-password" required />
                                    <div class="show-password">
                                        <input type="checkbox" id="show-confirm-password-checkbox" />
                                        <label for="show-confirm-password-checkbox">Show Password</label>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <!-- Change Password Button -->
                        <div class="button" id="otp-button"> 
                            <span id="otp_btn">Change Password</span>
                            <span id="btn_back"></span>
                        </div>
                    </div>
                </div>
                <div id="popup-message" class="popup hidden">
                    Password Successfully Updated.
                </div>                
            </main>
            <footer id="footer"></footer>
        </div>
    `;

    
}
