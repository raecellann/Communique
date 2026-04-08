# Notification Endpoints <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="40" height="40" align="center"/>

<hr>
<br>

## ` GET ` All Notifications✅

> Notifications for people who wants to be updated in today and 4 days ago, so expect to get 4 days notifications as history 🦖✨

### Request Header
```
    GET http://localhost:3000/v1/notification/notify
```

### Success Response 🟢
```json
{
    "success": true,
    "message": "Succesfully get all of Notifications 🦖🎉",
    "data": {
        "22/11/2024":[
            {
                "action": "liked",
                "profile_image" : "cloudinary.com",
                "username": "Yeshel",
                "message": "Heart to your post",
            },
            {
                "action": "follow",
                "profile_image" : "cloudinary.com",
                "username": "Yeshel",
                "message": "Started Following you",
            },
            {
                "action": "comment",
                "profile_image" : "cloudinary.com",
                "username": "Yeshel",
                "message": "Commented to your post",
            },
            {
                "action": "repost",
                "profile_image" : "cloudinary.com",
                "username": "Yeshel",
                "message": "Reposted your post",
            }
        ],
        "21/11/2024":[
            "Nothing special 🌷🐝 - - -"
        ],
    }
}
   
```
##

### Error Response 🔴
```json
    {
        "success": false,
        "message": "Uh oh, Something is wrong on your Notification 🚩⚠️",
        "data": null
    }
```
##

<br>
<br>