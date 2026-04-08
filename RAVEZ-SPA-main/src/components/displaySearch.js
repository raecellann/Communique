import { all } from "axios";

export default async function displaySearch(root) {
  root.innerHTML = `
        <div class="page-title">
                <h1>Search</h1>
              </div>
              <div class="search-container">
                <div class="search-bar-container">
                  <input type="text" id="search-input">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>  
                </div>
                <div class="search-bar-navigation-container">
                  <div class="nav-container">
                    <div class="thread-btn-container focus">
                      <span>Threads</span>
                    </div>
                    <div class="profile-btn-container unfocus">
                      <span>Profile</span>
                    </div>
                  </div>
                </div>
                <div class="search-bar-result-container thread-search">
                  <span class="result-title ">Trending Topics</span>
                </div>
              </div>
  `;

  handleNavigationButton();
  handleSuggestions();
  handleSearchBar()
}

const handleNavigationButton = () => {
  const threadBtn = document.querySelector('.thread-btn-container');
  const profileBtn = document.querySelector('.profile-btn-container');
  const resultContainer = document.querySelector('.search-bar-result-container');

  profileBtn.addEventListener('click', () => {
    if (profileBtn.classList.contains('unfocus')) {
      profileBtn.classList.remove('unfocus');
      profileBtn.classList.add('focus');

      threadBtn.classList.remove('focus')
      threadBtn.classList.add('unfocus')

      resultContainer.classList.remove('thread-search');
      resultContainer.classList.add('profile-search')

      handleSuggestions();
    }
  })

  threadBtn.addEventListener('click', () => {
    if (threadBtn.classList.contains('unfocus')) {
      threadBtn.classList.remove('unfocus');
      threadBtn.classList.add('focus');

      profileBtn.classList.remove('focus')
      profileBtn.classList.add('unfocus')

      resultContainer.classList.remove('profile-search');
      resultContainer.classList.add('thread-search')

    handleSuggestions();
    }
  })
}

const handleSuggestions = async () => {
  const searchInput = document.getElementById('search-input');

  const forThreads =  document.querySelector('.thread-search');
  const forProfile = document.querySelector('.profile-search');

  





  const API = import.meta.env;

  try {
    // Fetch threads
    const threadResponse = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/thread?limit=1000&offset=0&sortBy=created_at`, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        apikey: API.VITE_API_KEY,
      },
    });
    const threadData = await threadResponse.json();
    const threads = threadData?.data || [];

    const accountId = localStorage.getItem('account_id')

    console.log(accountId);


    // Fetch profiles
    const profileResponse = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/account/profiles`, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        apikey: API.VITE_API_KEY,
      },
    });
    const profileData = await profileResponse.json();
    const profiles = profileData?.data || [];


    // console.log("Threads:", threads);
    // console.log("Profiles:", profiles);

    // Aggregate likes for each profile
    const profileLikes = profiles.map(profile => {
      const userThreads = threads.filter(thread => thread.account_id === profile.account_id);
      const totalLikes = userThreads.reduce((sum, thread) => sum + (thread.likes || 0), 0);
      return {
        profile_image: profile.profile_image, 
        username: profile.username,
        account_id: profile.account_id,
        totalLikes,
      };
    });

    // Exclude the current user's account
    const filteredProfiles = profileLikes.filter(profile => Number(profile.account_id) !== Number(accountId));

    // Sort profiles by total likes in descending order
    const sortedProfiles = filteredProfiles.sort((a, b) => b.totalLikes - a.totalLikes);
    

    const mostLikes = sortedProfiles.slice(0, 5);

    // console.log("Filtered and Sorted Profiles:", mostLikes);

    // Collect hashtags from threads for trending topics
    const allHashtags = threads.flatMap(thread => thread.hashtags || []);
    const hashtagCounts = allHashtags.reduce((counts, hashtag) => {
      counts[hashtag] = (counts[hashtag] || 0) + 1;
      return counts;
    }, {});
    const sortedHashtags = Object.entries(hashtagCounts).sort((a, b) => b[1] - a[1]);
    const topHashtags = sortedHashtags.slice(0, 5);

    


    if ((forThreads && !searchInput.value) || forThreads) {
      renderSuggested(topHashtags, forThreads, 'Trending Topics');
  
  
  
    } 
  
    if ((forProfile && !searchInput.value) || forProfile) {
      renderSuggested(mostLikes, forProfile, 'Suggested Friends')
    }



  } catch (err) {
    console.error('Error fetching data:', err.message, err.stack);
  }

























  

  
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

const threadPostResult = (thread) => {

  const created_at = new Date(thread.created_at);
  const now = new Date();
  
  const timeDiff = (now - created_at);

  const timeAgo = formattedTime(timeDiff);

  const contentWithHashtags = thread.content
        .replace(/\n/g, "<br>") // Replace newlines with <br>
        .replace(/#(\w+)/g, '<a href="/hashtag/$1" class="hashtag">#$1</a>'); // Wrap hashtags with <a> tags


  return `
    <div class="thread-post" data-post-id="1">
      <div class="thread-user-image-container">
        <div class="image-container">
          <img src=${thread.user_profile} alt="yeshel-profile" id="user-image">
        </div>  
      </div>
      <div class="thread-post-data-container">
        <div class="top-container">
          <span class="poster-username">@${thread.username}</span>
          <span class="circle"></span>
          <span class="time-posted">${timeAgo}</span>
          <div class="thread-post-option-btn">
            <span class="circle1"></span>
            <span class="circle2"></span>
            <span class="circle3"></span>
          </div>
        </div>
        <div class="content-container">
          <span>${contentWithHashtags}</span>
        </div>
      </div>
    </div>
  `;
}

const suggestedTopics = (data) => {

  const contentWithHashtags = data[0]
        .replace(/\n/g, "<br>") // Replace newlines with <br>
        .replace(/#([A-Za-z0-9_-]+)/g, '<a href="" class="hashtag">#$1</a>');// Wrap hashtags with <a> tags

  return `
     <div class="hashtag-container">
        <span class="hashtag-topic">${contentWithHashtags}</span>
     </div>
  `;
}

const suggestedProfile = (data) => {
  return `
     <div class="hashtag-container">
        <span class="hashtag-topic">${data.username}</span>
        <span class="total-likes">(${data.totalLikes} likes)</span>
        <button class="follow-btn" data-username="${data.username}">Follow</button>
     </div>
  `;
}

const renderResult = (data, container, topic) => {
  let HTML = '';

  HTML += `<span class="result-title">${topic} </span>`;

  if (data.length === 0) {
    document.querySelector('.result-title').innerHTML = 'No Result Found'
  } else {
    if (topic === 'Trending Topics') {
      data.forEach(thread => {
        HTML += threadPostResult(thread)
      });
    } else {
      data.forEach(thread => {
        HTML += profileResult(thread, profileData);
      });
    }
  }
  container.innerHTML = HTML;
}

const renderSuggested = (data, container, topic) => {
  let HTML = '';

  HTML += `<span class="result-title">${topic} </span>`;

  if (data.length === 0) {
    document.querySelector('.result-title').innerHTML = 'No Result Found'
  } else {
    if (topic === 'Trending Topics') {
      data.forEach(thread => {
        HTML += suggestedTopics(thread)
      });
      
    } else {
      data.forEach(thread => {
        HTML += suggestedProfile(thread);
      });
    }
  }

  container.innerHTML = HTML;
}


const handleSearchBar = () => {
  const searchInput = document.getElementById('search-input');

  const forThreads =  document.querySelector('.thread-search');
  const forProfile = document.querySelector('.profile-search');

  let debounceTimer;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    
    // Clear the previous debounce timer
    clearTimeout(debounceTimer);
  
    // Set a new debounce timer
    debounceTimer = setTimeout(() => {
      searchThreads(query); // Call the search function after the debounce time
    }, 3000); // 300ms debounce time (adjust as needed)
  });

}




// Function to search threads
const searchThreads = async (query) => {
  const API = import.meta.env;

  if (!query) {
    console.log("Empty search query");
    return; // Don't fetch if the query is empty
  }

  

  try {
    const threadResponse = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/thread/search?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        apikey: API.VITE_API_KEY,
      },
    });

    const threaders = await threadResponse.json();
    const threads = threaders?.data || [];
    if (threaders.success) {

      console.log(threads);

      const thread_search = document.querySelector('.thread-search');

      renderResult(threads, thread_search, 'Trending Topics');

      
      
    } else {
      console.error("Failed to fetch threads:", threadResponse.statusText);
    }
  } catch (err) {
    console.error("Error fetching threads:", err.message);
  }
};


















































// import { all } from "axios";

// export default async function displaySearch(root) {
//   root.innerHTML = `
//       <div class="page-title">
//           <h1>Search</h1>
//       </div>

//       <div class="container">
//           <div class="search-bar">
//               <input type="text" placeholder="Search">
//           </div>
//           <div class="logo">
//               <a href="/home">
//                   <img src="FavLogo.ico" alt="Website Logo" class="logo">
//               </a>
//           </div>
//           <div class="content">
//               <div class="trending-topics">
//                   <div class="section-title" id="threads-title">Threads</div>
//                   <div class="trending-content" id="threads-content" style="display: flex;"></div>
//               </div>
//               <div class="follow-suggestions">
//                   <div class="section-title" id="profile-title">Profile</div>
//                   <div class="profile-content" id="profile-content" style="display: none;">
//                       <div>
//                           <img src="https://via.placeholder.com/32" alt="Profile">
//                           <span class="follow-username">@Yesh.exe</span>
//                           <button class="follow-btn">Follow</button>
//                       </div>
//                       <div>
//                           <img src="https://via.placeholder.com/32" alt="Profile">
//                           <span class="follow-username">@Yesh.exe</span>
//                           <button class="follow-btn">Follow</button>
//                       </div>
//                       <div>
//                           <img src="https://via.placeholder.com/32" alt="Profile">
//                           <span class="follow-username">@Yesh.exe</span>
//                           <button class="follow-btn">Follow</button>
//                       </div>
//                       <div>
//                           <img src="https://via.placeholder.com/32" alt="Profile">
//                           <span class="follow-username">@Yesh.exe</span>
//                           <button class="follow-btn">Follow</button>
//                       </div>
//                       <div>
//                           <img src="https://via.placeholder.com/32" alt="Profile">
//                           <span class="follow-username">@Yesh.exe</span>
//                           <button class="follow-btn">Follow</button>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </div>
//   `;



//   // Add event listeners for toggle functionality
//   const threadsTitle = document.getElementById("threads-title");
//   const threadsContent = document.getElementById("threads-content");
//   const profileTitle = document.getElementById("profile-title");
//   const profileContent = document.getElementById("profile-content");

//   const searchBar = document.querySelector(".search-bar input");
//   let debounceTimer;
//     // Toggle Threads
//   threadsTitle.addEventListener("click", () => {
//     if (threadsContent.style.display !== "flex") {
//         // Show Threads and hide Profile
//         threadsContent.style.display = "flex";
//         profileContent.style.display = "none";
//     }

//     searchBar.addEventListener("input", (e) => {
//       const query = e.target.value.trim();
      
//       // Clear the previous debounce timer
//       clearTimeout(debounceTimer);
    
//       // Set a new debounce timer
//       debounceTimer = setTimeout(() => {
//         searchThreads(query); // Call the search function after the debounce time
//       }, 3000); // 300ms debounce time (adjust as needed)
//     });


    
    
//   });

//   // Toggle Profile
//   profileTitle.addEventListener("click", () => {
//     if (profileContent.style.display !== "flex") {
//         // Show Profile and hide Threads
//         profileContent.style.display = "flex";
//         threadsContent.style.display = "none";
//     }

//     searchBar.addEventListener("input", (e) => {
//       const query = e.target.value.trim();
      
//       // Clear the previous debounce timer
//       clearTimeout(debounceTimer);

//       // Set a new debounce timer
//       debounceTimer = setTimeout(() => {
//         searchAccounts(query); // Call the search function after the debounce time
//       }, 3000); // 300ms debounce time (adjust as needed)
//     });


    
//   });
  
  
  
  
  
  
  
//   searchBar.addEventListener("input", (e) => {
//     const query = e.target.value.trim();
    
//     // Clear the previous debounce timer
//     clearTimeout(debounceTimer);
  
//     // Set a new debounce timer
//     debounceTimer = setTimeout(() => {
//       searchThreads(query); // Call the search function after the debounce time
//     }, 3000); // 300ms debounce time (adjust as needed)
//   });

//   handleSuggestion();
// }


// const handleSuggestion = async () => {
//   const API = import.meta.env;

//   try {
//     // Fetch threads
//     const threadResponse = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/thread?limit=1000&offset=0&sortBy=created_at`, {
//       method: 'GET',
//       headers: {
//         "content-type": "application/json",
//         apikey: API.VITE_API_KEY,
//       },
//     });
//     const threadData = await threadResponse.json();
//     const threads = threadData?.data || [];

//     const accountId = localStorage.getItem('account_id')

//     console.log(accountId);


//     // Fetch profiles
//     const profileResponse = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/account/profiles`, {
//       method: 'GET',
//       headers: {
//         "content-type": "application/json",
//         apikey: API.VITE_API_KEY,
//       },
//     });
//     const profileData = await profileResponse.json();
//     const profiles = profileData?.data || [];


//     // console.log("Threads:", threads);
//     // console.log("Profiles:", profiles);

//     // Aggregate likes for each profile
//     const profileLikes = profiles.map(profile => {
//       const userThreads = threads.filter(thread => thread.account_id === profile.account_id);
//       const totalLikes = userThreads.reduce((sum, thread) => sum + (thread.likes || 0), 0);
//       return {
//         profile_image: profile.profile_image, 
//         username: profile.username,
//         account_id: profile.account_id,
//         totalLikes,
//       };
//     });

//     // Exclude the current user's account
//     const filteredProfiles = profileLikes.filter(profile => Number(profile.account_id) !== Number(accountId));

//     // Sort profiles by total likes in descending order
//     const sortedProfiles = filteredProfiles.sort((a, b) => b.totalLikes - a.totalLikes);
    

//     const mostLikes = sortedProfiles.slice(0, 5);

//     // console.log("Filtered and Sorted Profiles:", mostLikes);

//     // Collect hashtags from threads for trending topics
//     const allHashtags = threads.flatMap(thread => thread.hashtags || []);
//     const hashtagCounts = allHashtags.reduce((counts, hashtag) => {
//       counts[hashtag] = (counts[hashtag] || 0) + 1;
//       return counts;
//     }, {});
//     const sortedHashtags = Object.entries(hashtagCounts).sort((a, b) => b[1] - a[1]);
//     const topHashtags = sortedHashtags.slice(0, 5);

//     // console.log("Top Hashtags:", topHashtags);


//     // Attach click event listeners to the follow buttons
//     // const followButtons = document.querySelectorAll(".follow-button");
//     // followButtons.forEach(button => {
//     //   button.addEventListener("click", () => {
//     //     const username = button.getAttribute("data-username");
//     //     console.log(`Followed ${username}`);
//     //     // Add your follow API logic here
//     //   });
//     // });


//     const threadsContent = document.getElementById("threads-content");
//     threadsContent.innerHTML = ""; // Clear any existing content

//     topHashtags.forEach(([hashtag, count], index) => {
//       const div = document.createElement("div");
//       div.innerHTML = `
//         <span class="trending-topic-text">${hashtag}</span>
//       `;
//       threadsContent.appendChild(div);
//     });


//     // Update the DOM for profile suggestions
//     const profileContent = document.getElementById("profile-content");
//     profileContent.innerHTML = ""; // Clear any existing content
//     mostLikes.forEach(({ profile_image, username, totalLikes }) => {
//       const div = document.createElement("div");
//       div.innerHTML = `
//         <img src=${profile_image} alt="Profile">
//         <
//         <span class="follow-username">@${username}</span>
//         <span class="total-likes">(${totalLikes} likes)</span>
//         <button class="follow-btn" data-username="${username}">Follow</button>
//       `;
//       profileContent.appendChild(div);
//     });



//   } catch (err) {
//     console.error('Error fetching data:', err.message, err.stack);
//   }
// };








// // Function to search threads
// const searchThreads = async (query) => {
//   const API = import.meta.env;

//   if (!query) {
//     console.log("Empty search query");
//     handleSuggestion();
//     return; // Don't fetch if the query is empty
//   }

//   const threadsContent = document.getElementById("threads-content");
//   threadsContent.innerHTML = ""; // Clear threads section

//   try {
//     const threadResponse = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/thread/search?query=${encodeURIComponent(query)}`, {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//         apikey: API.VITE_API_KEY,
//       },
//     });

//     if (threadResponse.ok) {
//       const threadData = await threadResponse.json();
//       const threads = threadData?.data || [];

//       // console.log(threads);

//       if (threads.length) {
//         threads.forEach((thread) => {
//           const div = document.createElement("div");
//           div.innerHTML = `
//             <div class="thread-post" data-post-id="1">
//               <div class="thread-user-image-container">
//                 <div class="image-container">
//                   <img src=${thread.user_profile} alt="yeshel-profile" id="user-image">
//                 </div>  
//               </div>
//               <div class="thread-post-data-container">
//                 <div class="top-container">
//                   <span class="poster-username">@${thread.username}</span>
//                   <span class="circle"></span>
//                   <span class="time-posted">${thread.created_at}</span>
//                   <div class="thread-post-option-btn">
//                     <span class="circle1"></span>
//                     <span class="circle2"></span>
//                     <span class="circle3"></span>
//                   </div>
//                 </div>
//                 <div class="content-container">
//                   <span>${thread.content}</span>
//                 </div>
//               </div>
//             </div>
//           `;
//           threadsContent.appendChild(div);
//         });
//       } else {
//         threadsContent.innerHTML = `<p>No thread results found for "${query}".</p>`;
//       }
//     } else {
//       console.error("Failed to fetch threads:", threadResponse.statusText);
//       threadsContent.innerHTML = `<p>Error fetching thread results.</p>`;
//     }
//   } catch (err) {
//     console.error("Error fetching threads:", err.message);
//     threadsContent.innerHTML = `<p>Error fetching thread results.</p>`;
//   }
// };

// // Function to search accounts
// const searchAccounts = async (query) => {
//   const API = import.meta.env;

//   if (!query) {
//     console.log("Empty search query");
//     handleSuggestion();
//     return; // Don't fetch if the query is empty
//   }

//   const profileContent = document.getElementById("profile-content");
//   profileContent.innerHTML = ""; // Clear profile section

//   try {
//     const accountResponse = await fetch(`${API.VITE_COMMUNIQUE_API_URL}/account/search?query=${encodeURIComponent(query)}`, {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//         apikey: API.VITE_API_KEY,
//       },
//     });

    

    


//     const accountData = await accountResponse.json();

//     const accounts = accountData?.data || [];

//     // console.log(accounts, "this is adasdasd")

//     if (accountData.success) {
//       if (accounts.length){
//         accounts.forEach((account) => {
//           const div = document.createElement("div");
//           div.innerHTML = `
//             <div class="profile">
//               <img src="${account.profile_image || 'https://via.placeholder.com/32'}" alt="Profile">
//               <span class="follow-username">@${account.username}</span>
//               <button class="follow-btn">Follow</button>
//             </div>
//           `;
//           profileContent.appendChild(div);
//         });
//       } else {
//         profileContent.innerHTML = `<p>No profile results found for "${query}".</p>`;
//       }
//     } else {
//       profileContent.innerHTML = `<p>No profile results found for "${query}".</p>`;
//     }
//     // if (accountResponse.ok) {
//     // } else {
//     //   console.error("Failed to fetch accounts:", accountResponse.statusText);
//     //   profileContent.innerHTML = `<p>Error fetching profile results.</p>`;
//     // }
//   } catch (err) {
//     console.error("Error fetching accounts:", err.message);
//     profileContent.innerHTML = `<p>Error fetching profile results.</p>`;
//   }
// };

// // Unified function to handle search
// const handleSearch = async (query) => {
//   if (!query) {
//     console.log("Empty search query");
//     return; // Exit if the query is empty
//   }

//   // Execute both searches simultaneously
//   await Promise.all([searchThreads(query), searchAccounts(query)]);
// };