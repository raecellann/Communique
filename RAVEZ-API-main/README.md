<h1 align="center"> R A V E Z</h1>
<p align="center">Team creating a clone of  thread application that focuses on creating its own API and design but still represents the feature of the famous Thread app</p>

<hr>

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Delivery%20Truck.png" alt="Delivery Truck" width="30" height="30" align="center" /> API Endpoints
* Status ✅ = Tested on response, security and ready to use

* Status 🔧 = On Current testing and possible debugging for bugs or errors

* Status ⚠️ = Fixin alot of bugs

<table align="center"><thead>
  <tr>
    <th colspan="4"><h3 align="center">Account Endpoints <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png" alt="Fire" width="30" height="30"/></h3></th>
  </tr></thead>
<tbody>
  <tr>
    <td align="center">Method</td>
    <td align="center">Description</td>
    <td align="center">URL</td>
    <td align="center">Status</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>Creating new user personalized account</td>
    <td>http://localhost:3000/v1/account/sign-up</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>Request user account for auhtentication request</td>
    <td>http://localhost:3000/v1/account/sign-in</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td colspan="4">||</td>
  </tr>
  <tr>
    <td colspan="4"><h3 align="center">Profile Endpoints <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png" alt="Fire" width="30" height="30" /></h3></td>
  </tr>
  <tr>
    <td align="center">Method</td>
    <td align="center">Description</td>
    <td align="center">URL</td>
    <td align="center">Status</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>Returns a User personal profile account data</td>
    <td>http://localhost:3000/v1/account/profile/{account_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>For editing or changing personal infos on the logged in account</td>
    <td>http://localhost:3000/v1/account/profile/{account_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>For deletion of personal or logged in account</td>
    <td>http://localhost:3000/v1/account/{account_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td colspan="4">||</td>
  </tr>
  <tr>
    <td colspan="4"><h3 align="center">Thread Endpoints <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png" alt="Fire" width="30" height="30"/></h3></td>
  </tr>
  <tr>
    <td align="center">Method</td>
    <td align="center">Description</td>
    <td align="center">URL</td>
    <td align="center">Status</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>Returns all thread post's</td>
    <td>http://localhost:3000/v1/thread?limit=10&offset=0&sortBy=created_at</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>Returns all Logged in User thread post's</td>
    <td> http://localhost:3000/v1/thread/profile/{account_id}?limit=10&offset=0&sortBy=created_at</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>Returns all Searched thread post's base on query</td>
    <td>http://localhost:3000/v1/thread/search?query={query_search}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>Returns a specific thread post</td>
    <td>http://localhost:3000/v1/thread/{thread_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>Creates a new thread post for the logged in user, this also include the hashtags</td>
    <td> http://localhost:3000/v1/thread/{acount_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>Report a specific thread post</td>
    <td>  http://localhost:3000/v1/thread/report/{thread_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>Deletion of a specific thread post</td>
    <td>http://localhost:3000/v1/thread/remove/{thread_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td colspan="4">||</td>
  </tr>
  <tr>
    <td colspan="4"><h3 align="center">Like Endpoints<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png" alt="Fire" width="30" height="30"/></h3></td>
  </tr>
  <tr>
    <td align="center">Method</td>
    <td align="center">Description</td>
    <td align="center">URL</td>
    <td align="center">Status</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>Returns a list of users who liked the thread post</td>
    <td>http://localhost:3000/v1/thread/likers/{thread_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>At the same time it can like and unlike on Update and Create like record for a specific thread post , helps also to avoid a workload of backend on frontend</td>
    <td>http://localhost:3000/v1/thread/like/{thread_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td colspan="4">||</td>
  </tr>
  <tr>
    <td colspan="4"><h3 align="center">Comment Endpoints <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png" alt="Fire" width="30" height="30"/></h3></td>
  </tr>
  <tr>
    <td align="center">Method</td>
    <td align="center">Description</td>
    <td align="center">URL</td>
    <td align="center">Status</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>Smart getting base on the thread, if a thread is a comment it will give you a reply and so on, It will consist of params to customize the amount of data needed to be fetched </td>
    <td>http://localhost:3000/v1/thread/comments-replies/{thread_id}?limit=10&offset=0&sortBy=created_at</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>Serve as a reply for a comment and a comment for a thread , this also can identify the needs for ending of recursioning</td>
    <td>http://localhost:3000/v1/thread/comment/{parent_thread_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td colspan="4">||</td>
  </tr>
  <tr>
    <td colspan="4"><h3 align="center">Hashtag Endpoints <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Hourglass%20Not%20Done.png" alt="Hourglass Not Done" width="28" height="28" /></h3></td>
  </tr>
  <tr>
    <td align="center">Method</td>
    <td align="center">Description</td>
    <td align="center">URL</td>
    <td align="center">Status</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>Fetch All threads contains the specific ` hashtag_name `</td>
    <td>http://localhost:3000/v1/thread/hashtag/search?query={hashtag_name}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>This will having a regex function to get the hashtags on the post</td>
    <td>http://localhost:3000/v1/thread/comment/{parent_thread_id}</td>
    <td align="center">⚠️</td>
  </tr>
  <tr>
    <td colspan="4"><h3 align="center">Follow Endpoints  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png" alt="Fire" width="30" height="30"/></h3></td>
  </tr>
  <tr>
    <td align="center">Method</td>
    <td align="center">Description</td>
    <td align="center">URL</td>
    <td align="center">Status</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>fetch all Followings on a certain user or ` account`</td>
    <td>http://localhost:3000/v1/account/follow/following/{account_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>fetch all Follower on a certain user or ` account`</td>
    <td>http://localhost:3000/v1/account/follow/follower/{account_id}</td>
    <td align="center">✅</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>You can follow and unfollow your friend ✌️✨ </td>
    <td> http://localhost:3000/v1/account/follow/{account_id}</td>
    <td align="center">✅</td>
  </tr>
</tbody></table>

##
` [ ♻️ NOTE ] Ready to copy for those on tested URL's already ✨🎉`

## <img src="https://github.com/user-attachments/assets/7e5de82d-7e84-4476-8099-a891f384269a" width="25" height="25" align="center" alt="figma logo" /> Figma 

https://www.figma.com/design/uAhX4tIxoqW0OsEV1iD8dE/APSSDEV-API(THREADS)?node-id=0-1&t=rYXQZkopQ10wlS2V-1

## Contributors

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Monocle.png" alt="Face with Monocle" width="30" height="30" align="center" /> Castro, Rey Arby ( Project Manager )

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png" alt="Beaming Face with Smiling Eyes" width="25" height="25" align="center"/> Delos Santos, Zeldrick ( Developer )

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Exploding%20Head.png" alt="Exploding Head" width="25" height="25" align="center"/> Galvez, Racell Ann ( Front-end )

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Cowboy%20Hat%20Face.png" alt="Cowboy Hat Face" width="25" height="25" align="center"/> Esmabe, Wilson ( Back-end )

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Disguised%20Face.png" alt="Disguised Face" width="25" height="25" align="center" /> De Castro, Vince Carlo ( Developer )
