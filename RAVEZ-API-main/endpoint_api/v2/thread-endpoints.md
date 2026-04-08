
# Thread Endpoints <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="40" height="40" align="center"/>

<hr>
<br>


## ` GET ` All Thread's ✅

> Fetch All Thread's posted by all User or User Follower's and can be also base on filtering of `sortedBy`, `limits & offset ` will be the result of pagination to create the infinite scroling effect 

### Request Header
```
    GET http://localhost:3000/v1/thread?limit=10&offset=0&sortBy=created_at
```

### Success Response  🟢
```json
{
  "success":true,
  "message": "1 Thread Succesfuly fetched 🎉✨",
  "data": [
    {
    "thread_id": 12,
    "is_repost": false,
    "account_id":12,
    "username": "kepler90",
    "user_profile": "clodinary.com",
    "thread_parent_id":null,
    "content": "#owo #lmao tara kain shawarma ✨",
    "hashtags": ["#owo","#lmao"],
    "likes":10,
    "comments": 9,
    "repost": 10,
    "reports": 0
    "created_at": "2024-10-10"
    }
  ]
}
```

### Error Response 🔴
```json
{
  "success":true,
  "message": "Uh oh, Something is wrong on getting all of the thread posts 🚩",
  "data": null
}
```
##

<br>
<br>

## ` GET ` User All Thread's ✅

>  Fetch all thread to the specified user by account_id or in short ` User Thread's  `

### Request Header
``` 
    GET http://localhost:3000/v1/thread/profile/{account_id}?limit=10&offset=0&sortBy=created_at
```

### Sucess Response 🟢
```json
{
  "success": true,
  "message": "${threads.length} Thread's has been found 🎉",
  "data": [
        {
            "thread_id": 12,
            "is_repost": false,
            "account_id":12,
            "username": "TummyOwo",
            "user_profile": "cloudinary.com",
            "parent_thread_id":null,
            "content": "Me too!",
            "hashtags": [],
            "likes": 123,
            "comments": 12,
            "repost": 2,
            "report": 1,
            "created_at": "2024-10-09"
        },
        {
            "thread_id": 13,
            "account_id":12,
            "username": "TummyOwo",
            "user_profile": "cloudinary.com",
            "parent_thread_id":null,
            "content": "Sheeesh im too lazy #bruh #moments",
            "hashtags": ["#bruh","moments"],
            "likes": 12,
            "comments": 1,
            "repost": 0,
            "report": 0,
            "created_at": "2024-10-11"
        }
    ]
}
```

### Error Response 🔴
```json
{
  "success": false,
  "message": "Something is wrong on getting user thread posts 🚩",
  "data": null
}
```
##

<br>
<br>

## `GET` Search Thread's ✅

> Fetch a specific Thread Post's base on the `Search query` by the user

### Request Header
```
    GET http://localhost:3000/v1/thread/search?query={query_search}
```

### Sucess Response 🟢
```json
{
  "success": true,
  "message": "Succesfully find your wanted threads 🔍🪄",
  "data": [
        {
            "thread_id": 12,
            "account_id":12,
            "username": "TummyOwo",
            "user_profile": "cloudinary.com",
            "parent_thread_id":null,
            "content": "Me too!",
            "hashtags": [],
            "likes": 123,
            "comments": 12,
            "repost": 2,
            "report": 1,
            "created_at": "2024-10-09"
        },
        {
           "thread_id": 12,
            "account_id":12,
            "username": "TummyOwo",
            "user_profile": "cloudinary.com",
            "parent_thread_id":null,
            "content": "Me too!",
            "hashtags": [],
            "likes": 123,
            "comments": 12,
            "repost": 2,
            "report": 1,
            "created_at": "2024-10-09"
        }
  ]
}
```

### Error Response 🔴
```json
{
  "success": false,
  "message": "Something is wrong on your searchPost pls check it 🚩",
  "data": null
}
```
##

<br>
<br>

## ` GET ` Specific Thread ✅

> Fetch just one thread to perform viewing of the specific thread


### Request Header
```
    GET http://localhost:3000/v1/thread/{thread_id}
```

### Success Response  🟢
```json
{
  "success":true,
  "data": {
    "thread_id": 12,
    "account_id":12,
    "username": "kepler90",
    "user_profile": "clodinary.com",
    "parent_thread_id":null,
    "content": "#owo #lmao tara kain shawarma ✨",
    "hashtags": ["#owo","#lmao"],
    "likes":10,
    "comments": 9,
    "repost": 10,
    "created_at": "2024-10-10"
    }
}
```

### Error Response 🔴
```json
{
  "success":true,
  "data": "Oops cant find the specific post🚩"
}
```
##

<br>
<br>

## ` POST ` Create New Thread ✅

> Creates a New thread post for the designated Account

### Request Header
```
    POST http://localhost:3000/v1/thread/{acount_id}
```

### Request Body:

```json
    {
        "content":"Lol I love Cats cause they look like living floof balls :3 #owo #loving-cats-for-layf"
    }
```
### Success Response 🟢
```json
    "success":true,
    "message": "Thread succesfuly Created!, Hooray 🎉",
    "data": {
        "thread_id": 12,
        "account_id": 3,
        "username": "UsrYolo90",
        "user_profile_image": "cloudinary.com",
        "parent_thread_id": null,
        "content": "#lol wala eh",
        "hashtags": ["#lol"],
        "likes": 12,
        "comments": 90,
        "repost": 9,
        "report": 0,
        "created_at": "2020-09-10"
    }
```

### Error Response 🔴
```json
    {
        "success":false,
        "message": "Jeez , Cant create the thread post, something wrong on post creation 🚩",
        "data": null
    }
```

<br>
<br>

## ` POST ` Report Thread ✅

> Reporting a Thread Post can result into banning of the specific Thread Post and may result of delition of the Post

### Request Header
```
    POST http://localhost:3000/v1/thread/report/{thread_id}
```

### Request Body
```json
    {
        "reasons": ["Bullying","Sexual","False Information"]
    }
```

### Success Response 🟢
```json
    {
        "success": true,
        "message": "Thread reported successfully 📣🎉",
        "data": {
            "thread_id": 12,
            "account_id": 3,
            "username": "UsrYolo90",
            "user_profile_image": "cloudinary.com",
            "parent_thread_id": null,
            "content": "#lol wala eh",
            "hashtags": ["#lol"],
            "likes": 12,
            "comments": 90,
            "repost": 9,
            "report": 10,
            "created_at": "2020-09-10"
        }
    }
```

### Error Response 🔴
```json
    {
        "success": false,
        "message": "Something is wrong on report, you might wanna check for it 🚩"
    }
```
##

<br>
<br>

## ` DELETE ` Remove Thread ✅

> Remove's specific Personal User thread with the `thread_id` given

### Request Header
```
    DELETE http://localhost:3000/v1/thread/remove/{thread_id}
```

### Success Response 🟢
```json
    {
        "success": true,
        "message": "Successfully Deleted a Thread ♻️🗑️",
        "thread_id": 2
    }
```
### Error Response 🔴
```json
    {   
        "success": false,
        "message": "Oops Something is not right, cant delete a thread sorry 🚩",
        "thread_id": null
    }
```

<br>
<br>
<hr>