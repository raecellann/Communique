import { appsState } from "../layouts/default.js";
import { navigateTo } from "./navigation.js";
// import { threadPost } from "./threadPost.js";

export default async function displayProfile(root) {
    // Clear the root and set page title
    root.innerHTML = `
        <div class="page-title">
            
        </div>
        <div id="profile-info" class="profile-info"></div>  <!-- Profile Information Container -->
        <div class="thread-home"></div>
    `;

    // Fetch and display the profile data
    await displayProfileInfo(root);
}

const addProfileBottomInfo = (profileData) => {
    const bottomContainer = document.querySelector('.profile-bottom-container');

    bottomContainer.innerHTML = `
        <div class="post-container"><span>${profileData.post}</span>post</div>
        <a class="follower-container" href="/followers"><span>${profileData.followers}</span> followers</a>
        <a class="following-container" href="/follow"><span>${profileData.following}</span> following</a>
    `
}

const displayProfileInfo = async (root) => {
    const API = import.meta.env;

    try {
        const accountId = localStorage.getItem('account_id');
        const token = getToken();
        if (!token) {
            alert("You need to be logged in to view the profile.");
            navigateTo('/sign-in');
            return;
        }

        // Check if profile data already exists in appsState
        if (appsState.profileData && appsState.profileData.accountId === accountId) {
            renderProfile(appsState.profileData, root);
        } else {
            // Fetch the profile data from the backend
            const response = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/account/profile/${accountId}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    apikey: API.VITE_API_KEY,
                    token: localStorage.getItem('token')
                }
            });

            const data = await response.json();

            if (data.success) {
                const profileData = data.data;
                appsState.profileData = { ...profileData }; // Cache profile data in appsState
                renderProfile(profileData, root);

            } else {
                alert("Failed to fetch profile data.");
            }
        }
    } catch (err) {
        console.error("Error fetching profile data:", err);
    }
};



const displayThreads = async (profileData, root) => {
    const API = import.meta.env;

    try {
        const accountId = localStorage.getItem('account_id');

        // Check if threads already exist in appsState
        if (appsState.threads && appsState.threads.accountId === accountId) {
            renderThreads(appsState.threads.data, profileData);
        } else {
            const response = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/thread/profile/${accountId}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    apikey: API.VITE_API_KEY,
                    token: localStorage.getItem('token')
                }
            });

            const res = await response.json();
            if (res.success) {
                const threads = res.data;
                appsState.threads = { data: threads, accountId }; // Cache threads in appsState
                renderThreads(threads, profileData);
            }
        // } else {
        //     alert("Failed to fetch threads.");
        // }
        }
    } catch (err) {
        console.error("Error fetching threads:", err);
    }
};


const renderThreads = (threads, profileData) => {
    const threadContainer = document.querySelector(".thread-home");
    
    let threadsHTML = '';
    if (threads.length === 0) {
        threadsHTML += `
            <div class="no-post-container">
                <img src="https://res.cloudinary.com/dlfmwbgst/image/upload/v1731667797/no-post-icon_birzoe.svg" alt="no-post-icon">
              </div>

            <div class="post-again-container">
                <div class="post-again">Want to post again?<br>Click Here</div>

                <div class="arrow-container">
                    <img src="https://res.cloudinary.com/dlfmwbgst/image/upload/v1731669076/Group_73_iqkwkz.png" alt="arrow-icon">
                </div>

            </div>
        `;
        
    }else {

        threads.forEach(thread => {
            threadsHTML += threadPost(thread, profileData);
        });
    }
    threadContainer.innerHTML = threadsHTML;

};






const renderProfile = (profileData, root) => {
    const profileContainer = root.querySelector("#profile-info");

    profileContainer.innerHTML = `
        <div id="app">
            <div id="container">
                <main id="main">
                    <div class="page-title">
                        <h1>PROFILE</h1>
                    </div>
                    <div class="profile-container">
                        <div class="user-avatar-container">
                            <img src="${profileData.profile_image}" alt="profile-image" id="userAvatar">
                        </div>
                        <div class="user-avatar-container2">
                            <div class="profile-top-container">
                                <div class="username">
                                    <h1>@${profileData.username.charAt(0).toUpperCase() + profileData.username.slice(1).toLowerCase()}</h1>
                                </div>
                                <a class="edit-profile-btn" href="">Edit Profile</a>
                                <a class="delete-profile-btn" href="">Delete Profile</a>
                            </div>
                            <div class="profile-bottom-container">
                               
                            </div>
                        </div>
                    </div>
                    <a class="delete-all-option-btn-container" href="">
                        <div class="delete-all-option-btn">
                            <span class="circle1"></span>
                            <span class="circle2"></span>
                            <span class="circle3"></span>
                        </div>
                    </a>
                </main>
                <footer id="footer"></footer>
            </div>
        </div>
    `;
    console.log(appsState)
    addProfileBottomInfo(profileData)

    const edit_profile = document.querySelector('.edit-profile-btn');

    edit_profile.addEventListener('click', (event) => {
        event.preventDefault();
        navigateTo('/profile/edit-profile');
    });


    // Fetch and render threads
    displayThreads(profileData, root);
  
};



const formattedTime = (diff) => {
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Approximation for months
    const years = Math.floor(days / 365); // Approximation for years

    if (seconds < 60) return `${seconds}s ago.`;
    if (minutes < 60) return `${minutes}m ago.`;
    if (hours < 24) return `${hours}h ago.`;
    if (days < 7) return `${days}d ago.`;
    if (weeks < 4) return `${weeks}w ago.`;
    if (months < 12) return `${months}m ago.`;
    return `${years}yr ago.`;
}


const threadPost = (threadApi, profileData) => {
    const threadData = threadApi;
    const created_at = new Date(threadData.created_at);
    const now = new Date();

    const timeDiff = (now - created_at);
    const timeAgo = formattedTime(timeDiff);

    const thread = `
    <div class="thread-home-container">
        <div class="thread-post" data-post-id="${threadData.id}">
            <div class="thread-user-image-container">
                <div class="image-container">
                    <img src="${profileData.profile_image}" alt="profile-image" id="user-image">
                </div>  
            </div>
            <div class="thread-post-data-container">
                <div class="top-container">
                    <span class="poster-username">@${profileData.username.charAt(0).toUpperCase() + profileData.username.slice(1).toLowerCase()}</span>
                    <span class="circle"></span>
                    <span class="time-posted">${timeAgo}</span>
                    <div class="thread-post-option-btn">
                        <span class="circle1"></span>
                        <span class="circle2"></span>
                        <span class="circle3"></span>
                    </div>
                </div>
                <div class="content-container">
                    <span>${threadData.content}</span>
                </div>
                <div class="bottom-container">
                    <div class="heart-icon">
                        <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12.7451C8 17.3006 12.221 19.7278 15.3101 21.9011C16.4 22.6673 17.45 23.3896 18.5 23.3896C19.55 23.3896 20.6 22.6683 21.6899 21.9001C24.7801 19.7287 29 17.3006 29 12.746C29 8.19149 23.225 4.9587 18.5 9.33903C13.775 4.9587 8 8.18961 8 12.7451Z" fill="currentColor" fill-opacity="0.75"/>
                        </svg>
                        <span class="num-likes">0</span> 
                    </div>
                    <div class="comment-icon">
                        <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.25 8.48322V9.8655M12.5 8.48322V9.8655M17.75 8.48322V9.8655M23 2.26294H2V16.0858H6.725V18.3896L11.975 16.0858H23V2.26294Z" stroke="white" stroke-opacity="0.75" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="num-comments">0</span> 
                    </div>
                    <div class="repost-icon">
                        <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.4 8.13239V10.6147C22.3983 11.9928 21.8078 13.3139 20.7579 14.2883C19.7081 15.2628 18.2847 15.8109 16.8 15.8124H3.13135L5.36565 13.7386L4.23435 12.6886L0.10095 16.525L3.80205 20.3897L4.99795 19.403L2.9815 17.2975H16.8C20.77 17.2975 24 14.2995 24 10.6147V6.64733L22.4 8.13239Z" fill="white" fill-opacity="0.8"/>
                        </svg>
                        <span class="num-reposts">0</span>                          
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    
    return thread;
}

// Helper function to get the logged-in account ID (e.g., from a session or JWT)
const getToken = () => {
    return localStorage.getItem('token');  // Replace with actual account ID retrieval method
};
