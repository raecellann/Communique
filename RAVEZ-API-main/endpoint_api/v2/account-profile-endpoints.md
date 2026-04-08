
# Profile Endpoints  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="40" height="40" align="center"/>

<hr>
<br>
 
## ` GET `  Account Information ✅

> For displaying Perosnal User Account this is beneficial for Profile page

### Request Header
```
    GET http://localhost:3000/v1/account/profile/{account_id}
```

### Success Response  🟢
```json
    {
        "success": true,
        "message": "Sucessfully loaded your Account Profile 🎉",
        "data" : {
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
        "message":"Jeez Something is wrong, cant get the information of the given account 🚩",
        "data": null
    }
``` 
##

<br>
<br>

## ` PUT `  Edit Profile Details ✅

> For editing or changing personal infos on the logged in account

### Request Header
```
    PUT  http://localhost:3000/v1/account/profile/{account_id}
```

### Request Body
```json
{
    "username": "Hatdog",
    "gender": "Male",
    "bio": "Not a hacker nor Dummy :)",
    "email": "hatdog@gmail.com",
    "profile_image":"owefojwfnogwkgp.cloudinary.com",
    "password": "123kahatdoganmoLmao"
}
```

### Success Response  🟢
```json
    {
        "sucess": true,
        "message":"Sucessfully updated your Account Profile 🎉",
        "data": {
            "account_id":12,
            "profile_image": "owefojwfnogwkgp.cloudinary.com",
            "username": "Hatdog",
            "gender":"Male",
            "email": "hatdog@gmail.com",
            "bio": "Not a hacker nor Dummy :)",
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
        "message":"Ooops Something is wrong, cant edit/change your profile info's 🚩",
        "data": null
    }
```
##

<br>
<br>

## ` DELETE `  Account ✅

> For  deletion of personal or logged in account

### Request Header
```
    DELETE  http://localhost:3000/v1/account/{account_id}
```

### Success Response  🟢
```json
    {
        "success": true,
        "message":"Successfully Deleted your Account, Goodbye to that account 👋"
    }
```

### Error Response 🔴
```json
    {
        "success": false,
        "message":"Oops Something is wrong, cant perform deletion of the account 🚩",
    }
``` 
##

<br>
<hr>