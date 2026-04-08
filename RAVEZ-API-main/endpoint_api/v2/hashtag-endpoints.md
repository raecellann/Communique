# Hashtag Endpoints <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="40" height="40" align="center"/>

<hr>
<br>

## ` GET ` Search Thread's Hashtags ✅

> Fetch All threads contains the specific ` hashtag_name `

### Request Header
```
    GET http://localhost:3000/v1/thread/hashtag/search?query={hashtag_name}
```

### Success Response 🟢
```json
    "success": true,
    "message": "Succesfully searched 1 thread by its hashtag 🌷🐝",
    "data": [
        {
       "thread_id": 12,
        "account_id":12,
        "username": "TummyOwo",
        "user_profile": "cloudinary.com",
        "parent_thread_id": 7,
        "content": "Me too! #owo",
        "hashtags": ["#owo"],
        "likes": 0,
        "replies": 0,
        "repost": 0,
        "report": 0,
        "created_at": "2024-10-09"
        }
    ]
```

### Error Response 🔴
```json
{
    "success": false,
    "data": "Something is wrong on your search hashtag 🚩"
}
```
##

<br>
<br>


## ` GET ` Trending Topic Thread Hashtag 🔧

> Fetch All threads contains the specific ` hashtag_name `

### Request Header
```
    GET http://localhost:3000/v1/threads/hashtags/trends
```

### Success Response 🟢
```json
{
    "success": true,
    "message": "Trending Topics For Today ✨",
    "data": [
        {
            "hashtag": "#owo",
            "threads": [
                "thread_id": 12,
                "account_id":12,
                "username": "TummyOwo",
                "user_profile": "cloudinary.com",
                "parent_thread_id": 7,
                "content": "Me too! #owo",
                "hashtags": ["#owo"],
                "likes": 20,
                "comment": 0,
                "repost": 0,
                "report": 0,
                "created_at": "2024-10-09"
            ]
        },
        {
            "hashtag": "#kabado",
            "threads": [
                "thread_id": 13,
                "account_id":12,
                "username": "TummyOwo",
                "user_profile": "cloudinary.com",
                "parent_thread_id": 7,
                "content": "Me too! #kabado",
                "hashtags": ["#kabado"],
                "likes": 15,
                "comment": 0,
                "repost": 0,
                "report": 0,
                "created_at": "2024-10-09"
            ]
        }
    ]
}
```

### Error Response 🔴
```json
{
    "success": false,
    "message": "Oops something is wrong, cant cant find the trends 🚩",
    "data": null
}
```
##
