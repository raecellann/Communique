
# Account Endpoints  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="40" height="40" align="center"/>

<hr>
<br>

## FOR NON-EXISTING USER
## ` PUT ` SIGN UP

> Creating new user account


### Request Header:
```
    PUT http://localhost:3000/v1/account/sign-up
```

### Request Body:
```json
    {
        "username": "username123",
        "gender":"Male",
        "email":"user@gmail.com",
        "password": "password123",
    }
```

### Success Response 🟢

```json
    {
        "success": true,
        "account_id": 123,
        "message": "Successfully Creating Account 🎉"
    }
```
### Error Response 🔴

```json
    {
        "success": false,
        "message": "Oops something is wrong on the sign-up 🚩"
    }
```

<br>
<br>


## FOR EXISTING USER
## ` POST ` SIGN IN

> Request user account for auhtentication request


### Request Header:
```
    POST http://localhost:3000/v1/account/sign-in
```

### Request Body:
```json
    {
        "username_or_email": "username123 || user@gmail.com",
        "password": "password123"
    }
```

### Success Response 🟢
```json
    {
        "success": true,
        "message":"Successfully login to your account 🎉"
        "data": {
            "account_id": 5,
            "token": "Secret Walang Clue 😏"
        }
    }
```


### Error Response 🔴

```json
    {
        "success": false,
        "message": "Oops something is wrong with the sign-up 🚩",
        "data":null
    }
```
##

<br>
<hr>