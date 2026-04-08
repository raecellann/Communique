import { appsState } from "../layouts/default";


export default async function displayHome(root) {
  
    root.innerHTML = `
        <div class="page-title">
            <h1>Today's <span id="time-status">Morning</span> Highlights</h1>
        </div>
        <div class="thread-home-container" id="thread-container"></div>
    `;

    await handleThreadPosts();
}

const handleThreadPosts = async () => {
    const API = import.meta.env;

    if (appsState.cachedHomeThreads) {
        console.log('Rendering .. . . .. . ')
        await renderThreads(appsState.cachedHomeThreads);
        return;
    }

    try {
        showLoading();
        const response = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/thread?limit=10&offset=0&sortBy=created_at`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                apikey: API.VITE_API_KEY
            }
        });

        const data = await response.json();

        if (data.success) {
            const threadPosts = data.data;

            appsState.cachedHomeThreads = [...(appsState.cachedHomeThreads || []), ...threadPosts];
            // console.log(appsState)
            renderThreads(threadPosts);

           
            appsState.offset += threadPosts.length;

            // const threadPostsContainer = document.getElementById('thread-container');

            // threadPosts.forEach((thread) => {
            //     threadPostsContainer.innerHTML += threadPost(thread)
            // })
        }
        // Remove loading indicator after fetching
        hideLoading();

        const optionBtns = document.querySelectorAll('.thread-post-option-btn');

        optionBtns.forEach((button) => {
            button.addEventListener('click', () => {
                console.log('clicked');
            });
        });
                
    } catch(err) {
        console.error(err)
    }
}



export const renderThreads = (threadPosts) => {
    const threadPostsContainer = document.getElementById('thread-container');

    threadPostsContainer.innerHTML = ''
    threadPosts.forEach((thread) => {
       
        threadPostsContainer.innerHTML += threadPost(thread);
        
        // Attach event listeners for the option buttons
        attachOptionButtonEvents();
        attachHeartButtonEvents(threadPosts);
        attachCommentButtonEvents(threadPosts);
        attachRepostButtonEvents(threadPosts);
    });

};


const showLoading = () => {
    const threadContainer = document.getElementById('thread-container');
    threadContainer.innerHTML += `<div class="loading-spinner">Loading...</div>`;
};

const hideLoading = () => {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) spinner.remove();
};




const attachOptionButtonEvents = () => {
    const optionBtns = document.querySelectorAll('.thread-post-option-btn');
    optionBtns.forEach((button) => {
        button.addEventListener('click', () => {
            console.log("Option button clicked!");
        });
    });
};
const attachHeartButtonEvents = (threadApi) => {
    const heartBtns = document.querySelectorAll('.heart-icon');
    heartBtns.forEach((button) => {
        button.addEventListener('click', async (event) => {
            
            try {
                const thread = threadApi.thread_id; // Assuming the button has a data-thread-id
                console.log(thread)
                const threadId = threadApi.thread_id; // Assuming the button has a data-thread-id
                const token = localStorage.getItem('token'); // Retrieve the account ID from the user session (or use JWT if needed)
                const accountId = localStorage.getItem('account_id'); // Retrieve the account ID from the user session (or use JWT if needed)
    
                if (!token) {
                    alert('You need to be logged in to like a post.');
                    return;
                }
                const API = import.meta.env;

                // Send a like request to the server
                const response = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/thread/like/${threadId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': API.VITE_API_KEY,
                        'token': localStorage.getItem('token')
                    },
                    body: JSON.stringify({ account_id: accountId }),
                });

                const data = await response.json();
                console.log(data)

                if (data.success) {
                    // Update the heart button state (like/unlike)
                    toggleHeartButton(event.target);

                    // Optionally, update the like count on the UI
                    // updateLikeCount(threadId, data.likes);
                } else {
                    console.error('Failed to like thread:', data.message);
                }
            } catch (err) {
                console.error('Error liking thread:', err);
            }
        });
    });
};

// Function to toggle the heart button (change its appearance)
const toggleHeartButton = (button, newlikeCount) => {
    const isLiked = button.classList.contains('liked');
    
    if (isLiked) {
        newlikeCount -= 1;
        button.classList.remove('liked'); // Remove 'liked' class
        button.style.color = ''; // Reset color (or add an unliked color)
    } else {
        newlikeCount += 1;
        button.classList.add('liked'); // Add 'liked' class
        button.style.color = 'red'; // Example: change heart color to red when liked
    }
};

// // Function to update the like count for a specific thread
// const updateLikeCount = (threadId, newLikeCount) => {
//     newLikeCount += 1
// };

// Helper function to get the logged-in account ID (e.g., from a session or JWT)
const getToken = () => {
    // Retrieve the account ID from session storage, local storage, or JWT
    // Example: return sessionStorage.getItem('accountId') or decodeJWTToken()
    return sessionStorage.getItem('accountId');  // Replace with actual account ID retrieval method
};









const attachCommentButtonEvents = () => {
    const commentbtn = document.querySelectorAll('.comment-icon');
    commentbtn.forEach((button) => {
        button.addEventListener('click', () => {
            console.log("Comment button clicked!");
        });
    });
}

const attachRepostButtonEvents = () => {
    const repostbtn = document.querySelectorAll('.repost-icon');
    repostbtn.forEach((button) => {
        button.addEventListener('click', () => {
            console.log("Repost button clicked!");
        });
    });
}












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

const threadPost = (threadApi) => {
    const threadData = threadApi;
    // console.log(threadData);
    const created_at = new Date(threadData.created_at);
    const now = new Date();
    
    const timeDiff = (now - created_at);

    const timeAgo = formattedTime(timeDiff);

    const contentWithHashtags = threadData.content
        .replace(/\n/g, "<br>") // Replace newlines with <br>
        .replace(/#(\w+)/g, '<a href="/hashtag/$1" class="hashtag">#$1</a>'); // Wrap hashtags with <a> tags


    const thread = `
        <div class="thread-post" data-post-id="1">
            <div class="thread-user-image-container">
            <div class="image-container">
                <img src=${threadData.user_profile} alt="${threadData.username}-profile" id="user-image">
            </div>  
            </div>
            <div class="thread-post-data-container">
            <div class="top-container">
                <div class="thread-post-credentials">
                    <span class="poster-username">@${threadData.username}</span>
                    <span class="circle"></span>
                    <span class="time-posted">${timeAgo}</span>
                </div>
                <div class="thread-post-option-btn" id= "post-option-btn">
                    <span class="circle1"></span>
                    <span class="circle2"></span>
                    <span class="circle3"></span>
                </div>
            </div>
            <div class="content-container">
                <span>${contentWithHashtags}</span>
            </div>
            <div class="bottom-container">
                <div class="heart-icon">
                <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12.7451C8 17.3006 12.221 19.7278 15.3101 21.9011C16.4 22.6673 17.45 23.3896 18.5 23.3896C19.55 23.3896 20.6 22.6683 21.6899 21.9001C24.7801 19.7287 29 17.3006 29 12.746C29 8.19149 23.225 4.9587 18.5 9.33903C13.775 4.9587 8 8.18961 8 12.7451Z" fill="currentColor" fill-opacity="0.75"/>
                </svg>
                <span class="num-likes">${threadData.likes}</span> 
                </div>
                <div class="comment-icon">
                <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.25 8.48322V9.8655M12.5 8.48322V9.8655M17.75 8.48322V9.8655M23 2.26294H2V16.0858H6.725V18.3896L11.975 16.0858H23V2.26294Z" stroke="white" stroke-opacity="0.75" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="num-comments">${threadData.comments}</span> 
                </div>
                <div class="repost-icon">
                <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.4 8.13239V10.6147C22.3983 11.9928 21.8078 13.3139 20.7579 14.2883C19.7081 15.2628 18.2847 15.8109 16.8 15.8124H3.13135L5.36565 13.7386L4.23435 12.6886L0.10095 16.525L3.80205 20.3897L4.99795 19.403L2.9815 17.2975H16.8C20.77 17.2975 24 14.2995 24 10.6147V6.64733L22.4 8.13239Z" fill="white" fill-opacity="0.8"/>
                    <path d="M1.6 10.2435C1.60168 8.86541 2.19222 7.54426 3.24206 6.56984C4.2919 5.59542 5.7153 5.0473 7.2 5.04574H20.8686L18.6343 7.11958L19.7656 8.16961L23.899 4.33319L20.198 0.468506L19.002 1.45514L21.0185 3.56068H7.2C3.23 3.56068 0 6.55865 0 10.2435V14.2247L1.6 12.7396V10.2435Z" fill="white" fill-opacity="0.8"/>
                </svg>
                <span class="num-reposts">${threadData.repost}</span>                          
                </div>
            </div>
            </div>
        </div>
    `;

    return thread
}