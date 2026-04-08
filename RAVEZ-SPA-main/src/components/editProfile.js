import cssLoader from "../utility/cssLoader";
import { navigateTo } from "./navigation";

export default async function EditProfile(root) {  
    console.log(localStorage.getItem('account_id'));

    root.innerHTML = `
            <div class="page-title">
                <h1>PROFILE</h1>
            </div>
            <div class="logo">
                <a href="/">
                  <img src="../FavLogo.ico" alt="Website Logo" class="logo">
                </a>
            </div>
            <div class="profile-container">
                <div class="photo-container">
                    <div class="change-photo">
                      <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png" alt="yeshel-profile" id="user-image">
                    </div>
                    <a  href='' class="change-photo-btn">Change Photo</a>  
                </div>
                
                <form class="profile-form">
                    <div class="form-field">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
            
                    <div class="form-field">
                        <label for="gender">Gender</label>
                        <select id="gender" name="gender" required>
                            <option value="" disabled selected>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
            
                    <div class="form-field">
                        <label for="birthdate">Birthdate</label>
                        <input type="date" id="birthdate" name="birthdate" required>
                    </div>
            
                    <div class="form-field">
                        <label for="email">Set Email Address</label>
                        <input type="email" id="email" name="email" required>
                    </div>
            
                    <div class="form-field">
                        <label for="password">Set Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>
            
                    <div class="button-container">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="save-btn">Save</button>
                    </div>
                </form>
            </div>       
    `;

    const change_avatar = document.querySelector('.change-photo-btn');

    change_avatar.addEventListener('click', (event) => {
        event.preventDefault();
        navigateTo('/profile/edit-avatar')
    });
}