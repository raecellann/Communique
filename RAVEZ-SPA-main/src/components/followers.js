import cssLoader from "../utility/cssLoader";
import { appsState } from "../layouts/default";

export default async function Followers(root) {  
    console.log(appsState.account_id,'followinggngnngngg')
    
    const users = [
        { username: "@Yesh.exe", imageUrl: "https://res.cloudinary.com/diws5bcu6/image/upload/v1731675071/men_user_4_os7usi.png" },
        { username: "@Roque-Road", imageUrl: "https://res.cloudinary.com/diws5bcu6/image/upload/v1731654480/men_user_8_xs6efg.png" },
        { username: "@Shrek-Oger", imageUrl: "https://res.cloudinary.com/diws5bcu6/image/upload/v1731675047/men_user_11_idna64.png" },
        { username: "@Vince-tako", imageUrl: "https://res.cloudinary.com/diws5bcu6/image/upload/v1731675071/men_user_1_cmcaic.png" },
        { username: "@Prettyboi-zj", imageUrl: "https://res.cloudinary.com/diws5bcu6/image/upload/v1731675240/2_z7oioo.png" },
        { username: "@Wil-Soon", imageUrl: "https://res.cloudinary.com/diws5bcu6/image/upload/v1731675277/4_waxyt5.png" },
        { username: "@Grey-arby", imageUrl: "https://res.cloudinary.com/diws5bcu6/image/upload/v1731675070/men_user_10_dx7q8l.png" },
        { username: "@JaneSmith", imageUrl: "https://res.cloudinary.com/diws5bcu6/image/upload/v1731654480/men_user_8_xs6efg.png" },
    ];

    root.innerHTML = `
        <div id="container">
            <div class="header">
                <div class="logo">
                    <img src="https://res.cloudinary.com/diws5bcu6/image/upload/v1731669068/logo1_lffpz7.svg" alt="Logo">
                </div>
                <div class="title">
                    <h1>PROFILE</h1>
                </div>
            </div>
        
            <div class="navbar">
                <button class="nav-button active">Following</button>
                <button class="nav-button active">Followers</button>
            </div>

            <div class="follower-container"></div> <!-- Container for rows -->
        </div>
    `;

    const followerContainer = root.querySelector('.follower-container');

    // Create rows dynamically
    users.forEach(user => {
        const row = document.createElement('div');
        row.classList.add('notification-row', 'empty');
        row.innerHTML = `
            <div class="image-container">
                <img src="${user.imageUrl}" alt="User image">
            </div>
            <div class="username">
                <span class="follow-username">${user.username}</span>
            </div>
            <button class="follow-btn follow">Follow Back</button>
        `;

        // Attach event listeners to the follow button
        const followButton = row.querySelector('.follow-btn');

        // followButton.addEventListener('mouseover', () => {
        //     // followButton.classList.replace('follow', 'remove');
        //     followButton.style.opacity = '50%';
        //     // followButton.textContent = 'Remove';

        //     // followButton.classList.contains('follow') 
        //     //     ? followButton.classList.replace('follow', 'remove') 
        //     //     : null;
        // });

        // followButton.addEventListener('mouseout', () => {
        //     // followButton.classList.replace('remove', 'follow');
        //     followButton.style.opacity = '100%';
        //     // followButton.textContent = 'Follow Back';
        //     // followButton.classList.contains('remove') 
        //     //     ? followButton.classList.replace('remove', 'follow') 
        //     //     : null;
        // });

        followButton.addEventListener('click', () => {
            if (followButton.textContent === 'Following') {
                followButton.textContent = 'Follow Back';
                followButton.classList.replace('following', 'follow');
            } else {
                followButton.textContent = 'Following';
                followButton.classList.replace('follow', 'following');
            }
        });
        

        followerContainer.appendChild(row);
    });
}

const fecthFollow = () => {
    const API = met
    try {
        const response = fetch(``)
    } catch(err) {
        console.error(err)
    }
}