# Comment Endpoints <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="40" height="40" align="center"/>

<hr>

## ` GET ` All Replies || Comments of a Thread ✅

> It will consist of params to customize the amount of data needed to be fetched 


### Request Header
```
    GET  http://localhost:3000/v1/thread/comments-replies/{thread_id}?limit=10&offset=0&sortBy=created_at
```

### Success Response 🟢
```json
    {
        "success": true,
        "message": "Found 2 replies on the selected thread Post ✨🎉",
        "data": [
            {
                "thread_id": 12,
                "is_repost": false,
                "account_id":12,
                "username": "TummyOwo",
                "user_profile": "cloudinary.com",
                "parent_thread_id": 7,
                "content": "Me too!",
                "hashtags": [],
                "likes": 0,
                "replies": 0,
                "repost": 0,
                "report": 0,
                "created_at": "2024-10-09"
            },
            {
                "thread_id": 13,
                "is_repost": false,
                "account_id":1,
                "username": "Vince",
                "user_profile": "cloudinary.com",
                "parent_thread_id": 7,
                "content": "Me too! lmao",
                "hashtags": [],
                "likes": 2,
                "replies": 0,
                "repost": 0,
                "report": 0,
                "created_at": "2024-10-09"
            }
        ]
    }
```

### Error Response 🔴
```json
    {
        "success": false,
        "message": "Uh oh, something is wrong cant get the replies 🚩",
        "data": null
    }
```

<br>
<br>

## ` POST ` Reply and Comment Thread ✅

> Serve as a reply for a comment and a comment for a thread , this also can identify the needs for ending of recursioning 


### Request Header:
```
    POST http://localhost:3000/v1/thread/comment/{thread_id}
```

### Request Body
```json
    {
        "content":"Lol I love Cats cause they look like living floof balls :3"
    }
```

### Success Response 🟢
```json
    {
        "success": true,
        "message": "Successfully post a comment at a thread 🎉✨",
        "data": {
            "thread_id": 12,
            "account_id":12,
            "username": "TummyOwo",
            "user_profile": "cloudinary.com",
            "parent_thread_id": 7,
            "content": "Me too!",
            "hashtags": [],
            "likes": 0,
            "replies": 0,
            "repost": 0,
            "report": 0,
            "created_at": "2024-10-09"
        }
    }
```

### Error Response 🔴
```json
    {
        "success": false,
        "message": "Jeez, Something is wrong on creating a comment, mind check it out? ✌️🚩",
        "data": null
    }
```

<br>
<br>

## ` DELETE ` Comment Thread🔧

> Incase of replies it will go on a `cascade Delete` , deletes also a specific comment


### Request Header:
```
    DELETE http://localhost:3000/v1/threads/{thread_id}/comment
```

### Success Response 🟢
```json
    {
        "success": true,
        "message": "Successfuly Deleted a Thread Comment 🔰"
    }
```
### Error Response 🔴
```json
    {
        "success": false,
        "message": "Can't perfrom Deletion at this time 🚩"
    }
```
##
<br>
<hr>

<br>
<br>
<br>
<br>
<br>
