# Follow Endpoints <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="40" height="40" align="center"/>

## ` GET ` All Following 🔧

> fetch all Followings on a certain user or ` account`

### Request Header
```
    GET http://localhost:3000/v1/account/following/{account_id}
```

### Success Response 🟢

```json
    {
        "success": true,
        "message": "Successfuly get all who following 🤓☝️🎉",
        "data": [
            {
                "profile_image": "cloudinary.com",
                "username": "John Doe",
            },
            {
                "profile_image": "cloudinary.com",
                "username": "Yeshh",
            },
            {
                "profile_image": "cloudinary.com",
                "username": "Yeshh",
            }
        ]
    }
```

### Error Response 🔴
```json
{
    "success": false,
    "message": "Oops cant find the followings of the account",
    "data":null
}
```
<br>
<br>

## ` GET ` All Follower 🔧

> fetch all Followers on a certain user or ` account`

### Request Header
```
    GET  http://localhost:3000/v1/account/follower/{account_id}
```

### Success Response 🟢

```json
    {
        "success": true,
        "message": "Successfuly get all who follower 🤓☝️🎉",
        "data": [
            {
                "profile_image": "cloudinary.com",
                "username": "John Doe",
            },
            {
                "profile_image": "cloudinary.com",
                "username": "Yeshh",
            },
            {
                "profile_image": "cloudinary.com",
                "username": "Yeshh",
            }
        ]
    }
```


### Error Response 🔴
```json
    {
        "success": false,
        "message": "Oops cant find the followers of the account 🚩",
        "data":null
    }
```
##

### Error Response 🔴
```json
    {
        "success": false,
        "message": "Oops cant find who you following 🚩",
        "data":null
    }
```
##

<br>
<br>

## ` GET ` Search for Account ✅

> fetch all Accounts based on user query this is possible if you wanna find your friend then ` follow ` them

### Request Header
```
    GET http://localhost:3000/v1/accounts/search?query={search_term}
```

### Success Response 🟢

```json
    {
        "success": true,
        "data": [
            {
                "account_id": 1,
                "username": "John Doe",
            },
            {
                "account_id": 2,
                "username": "Yeshh",
            }
        ]
    }
```

### Error Response 🔴
```json
    {
        "success": false,
        "data": "Cant understand who are you finding 🐝 - -"
    }
```
##

<br>
<br>

## ` POST ` Follow ✅

> You can follow and unfollow your friend ✌️✨ 

### Request Header
```
    POST http://localhost:3000/v1/account/follow/{account_id}
```

### Request Body 
```json
No Request Body 🐝🌷
```
### Success Response 🟢

```json
    {
        "success": true,
        "message": "Your Following Arbybille 🐝 - -",
        "data": {
            "account_id":12,
            "profile_image":"owefojwfnogwkgp.cloudinary.com",
            "username": "vince9090",
            "gender": "Male",
            "email": "hatdog@gmail.com",
            "bio": null,
            "followers": 21,
            "following": 1,
            "post": 10
        }
    }
```


### Error Response 🔴
```json
    {
        "success": false,
        "message": "Something is wrong, cant perform follow 🚩 ",
        "data":null
    }
```
##

<br>
<br>

## ` DELETE ` Following

> You can unfollow your friend if an argument happen on your time, de joke lang ✌️ 

### Request Header
```
    GET http://localhost:3000/v1/account/{account_id}/followers/{follower_id}
```

### Success Response 🟢

```json
    {
        "success": true,
        "message": "Success Unfollowing 🐝 - -"
    }
```


### Error Response 🔴
```json
    {
        "success": false,
        "message": "Failed to unfollow the user."
    }
```

<br>
<br>


<br>
<hr>