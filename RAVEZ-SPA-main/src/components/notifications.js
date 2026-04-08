import cssLoader from "../utility/cssLoader";

export default async function Notifications1(root) {  
    console.log(localStorage.getItem('account_id'));

    root.innerHTML = `
        <div id="header-container">
            <div class="header">
                <div class="logo">
                    <img src="https://res.cloudinary.com/dlfmwbgst/image/upload/v1731748245/FavLogo_qh32qu.ico" alt="Logo">
                </div>
                <div class="title">
                    <h1>Notifications</h1>
                </div>
            </div>
        </div>
    
        <div class="navbar">
            <button class="nav-button active">All Notifications</button>
            <button class="nav-button active">New Followers</button>
            <button class="nav-button">Mark all as read</button>
        </div>

        

        <div class="notification-container">
            <div class="notification-header">
                <h1 class="notification-title">Today</h1>
                <div class="notification-counter" id="today-counter">0</div>
            </div>

            <div class="notification-row empty">
                <div class="notification-type-icon"> 
                    <img src="https://res.cloudinary.com/dlfmwbgst/image/upload/v1732115584/heart_cr2gjn.svg" alt="heart-logo">
                </div>

                <div class="user-profile-icon">
                    <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png" alt="user-profile">
                </div>

                <div class="username">
                    <h1>@Yesh.exe</h1>
                </div>

                <div class="notification-status">
                    <h1>reacted to your post.</h1>
                </div>

                <div class="view-post-btn">
                    <a href="#">View Post</a>
                </div>

                <div class="ignore-btn">
                    <a href="#">Ignore</a>
                </div>

                <div class="post-time">
                    <div class="circle"></div>
                    <h1>2hrs ago</h1>
                </div>

            </div>
            
            <div class="notification-row empty">
                <div class="notification-type-icon"> 
                    <img src="https://res.cloudinary.com/dlfmwbgst/image/upload/v1732115584/heart_cr2gjn.svg" alt="heart-logo">
                </div>

                <div class="user-profile-icon">
                    <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png" alt="user-profile">
                </div>

                <div class="username">
                    <h1>@Yesha_nga_pala_e2_haha</h1>
                </div>

                <div class="notification-status">
                    <h1>reacted to your post.</h1>
                </div>

                <div class="view-post-btn">
                    <a href="#">View Post</a>
                </div>

                <div class="ignore-btn">
                    <a href="#">Ignore</a>
                </div>

                <div class="post-time">
                    <div class="circle"></div>
                    <h1>3hrs ago</h1>
                </div>
            </div>


            <div class="view-all">
                <a href="#">View All</a>
            </div>
        </div>

        

        <div class="notification-container">
            <div class="notification-header">
                <h1 class="notification-title">Yesterday</h1>
                <div class="notification-counter" id="yesterday-counter">0</div>
            </div>

            <div class="notification-row empty">
                <div class="notification-type-icon"> 
                    <img src="https://res.cloudinary.com/dlfmwbgst/image/upload/v1732115583/friend_ed7wxl.svg" alt="friend-logo">
                </div>

                <div class="user-profile-icon">
                    <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png" alt="user-profile">
                </div>

                <div class="username">
                    <h1>@Yesh.exe</h1>
                </div>

                <div class="notification-status">
                    <h1>started to following you.</h1>
                </div>

                <div class="view-post-btn">
                    <a href="#">View Post</a>
                </div>

                <div class="ignore-btn">
                    <a href="#">Ignore</a>
                </div>

                <div class="post-time">
                    <div class="circle"></div>
                    <h1>2hrs ago</h1>
                </div>
            </div>
            
            <div class="notification-row empty">
                <div class="notification-type-icon"> 
                    <img src="https://res.cloudinary.com/dlfmwbgst/image/upload/v1732115583/comment_j9nuna.svg" alt="comment-logo">
                </div>

                <div class="user-profile-icon">
                    <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png" alt="user-profile">
                </div>

                <div class="username">
                    <h1>@Yesh.exe</h1>
                </div>

                <div class="notification-status">
                    <h1>commented to your post.</h1>
                </div>

                <div class="view-post-btn">
                    <a href="#">View Post</a>
                </div>

                <div class="ignore-btn">
                    <a href="#">Ignore</a>
                </div>

                <div class="post-time">
                    <div class="circle"></div>
                    <h1>1day ago</h1>
                </div>
            </div>

            
        </div>

        <div class="notification-container">
            <div class="notification-header">
                <h1 class="notification-title">Last Week</h1>
                <div class="notification-counter" id="today-counter">0</div>
            </div>

            <div class="notification-row empty">
                <div class="notification-type-icon"> 
                    <img src="https://res.cloudinary.com/dlfmwbgst/image/upload/v1732115584/heart_cr2gjn.svg" alt="heart-logo">
                </div>

                <div class="user-profile-icon">
                    <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png" alt="user-profile">
                </div>

                <div class="username">
                    <h1>@leahaha</h1>
                </div>

                <div class="notification-status">
                    <h1>reacted to your post.</h1>
                </div>

                <div class="view-post-btn">
                    <a href="#">View Post</a>
                </div>

                <div class="ignore-btn">
                    <a href="#">Ignore</a>
                </div>

                <div class="post-time">
                    <div class="circle"></div>
                    <h1>1 week ago</h1>
                </div>

            </div>

            <div class="notification-row empty">
                <div class="notification-type-icon"> 
                    <img src="https://res.cloudinary.com/dlfmwbgst/image/upload/v1732115584/heart_cr2gjn.svg" alt="heart-logo">
                </div>

                <div class="user-profile-icon">
                    <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1730429760/women_user_ohu8ga.png" alt="user-profile">
                </div>

                <div class="username">
                    <h1>@sareah</h1>
                </div>

                <div class="notification-status">
                    <h1>reacted to your post.</h1>
                </div>

                <div class="view-post-btn">
                    <a href="#">View Post</a>
                </div>

                <div class="ignore-btn">
                    <a href="#">Ignore</a>
                </div>

                <div class="post-time">
                    <div class="circle"></div>
                    <h1>1 week ago</h1>
                </div>

            </div>

        </div>
    `;

   
}
