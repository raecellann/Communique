# Like Endpoints <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="40" height="40" align="center"/>

<hr>
<br>

## ` PUT ` All in one Like ✅

> At the same time it can like and unlike on  ` Update ` and ` Create ` like record for a specific thread post , helps also to avoid a work of backend on frontend

### Request Header
```
    PUT http://localhost:3000/v1/thread/like/{thread_id}
```

### Reuqest Body
```json
 No request Body neeeded 🍿🍾
```

### Success Response 🟢
```json
{
    "success": true,
    "message": "Succesfuly ${liked or unliked} a thread post 🪄",
    "data": {
        "thread_id": 12,
        "account_id":12,
        "username": "kepler90",
        "user_profile": "clodinary.com",
        "thread_parent_id":null,
        "content": "#owo #lmao tara kain shawarma ✨",
        "hashtags": ["#owo","#lmao"],
        "likes":10,
        "comments": 9,
        "repost": 10,
        "reports": 0,
        "created_at": "2024-10-10"
    }
}
   
```
##

### Error Response 🔴
```json
    {
        "success": false,
        "message": "Uh oh, Something is wrong on your smart like 🚩⚠️",
        "data": null
    }
```
##

<br>
<br>

## ` GET ` All Liker's of a Thread ✅

> Fetches all Likes on a specific thread allows for checking who are the
likers on a thread post, this can be use for viewing Likes

### request header:
```
    GET http://localhost:3000/v1/thread/likers/{thread_id}
```

### Success Response  🟢
```json
{
   "success": true,
   "message": "Successfully get the likers of the thread ( •̀ ω •́ )✧",
   "data": [
        {
            "username":"YeshNig",
            "user_profile_image": "cloudinaryuwu.com"
        },
        {
            "username":"Yeshel",
            "user_profile_image": "cloudinaryuwu.com"
        },
        {
            "username":"BastadummyniraecellLmao",
            "user_profile_image": "cloudinaryuwu.com"
        }
   ]
}
```

### Error Response  🔴
```json
  {
    "success": false,
    "message": "Jeez something is wrong, i cant get the liker's Data 🚩",
    "data": null
  }
```
## 