# Documentation
**Welcome to the API document this will explain all endoint with examples**

## Endpoint

``/api/v1/auth``
``/api/v1/users``
``/api/v1/conversations``
``/api/v1/conversations/{ID}/messages``
``/api/v1/conversations/{ID}/typing``

## Authentication

### Login
How to login to the api

POST ``/api/v1/auth/login``

```
"body": {
    "login": "foo@gmail.com",
    "password": "mypass"
}
```

```
"body": {
    "success": true,
    "message": "Connexion à l'utilisateur effectué avec succès",
    "user": {
        "_id": "644812422bcce408718b440d",
        "email": "foo@gmail.com",
        "username": "foo"
    }
}
```

A cookie jwt that contains token has been created on client

### Register
How to create an account to the api

POST ``/api/v1/auth/register``

```
"body": {
    "email": "foo@gmail.com",
    "username": "foo",
    "password": "mypass",
    "confirmPassword": "mypass"
}
```

```
"body": {
    "success": true,
    "message": "Utilisateur créer avec succès",
    "user": {
        "_id": "644812422bcce408718b440d",
        "username": "foo",
        "email": "foo@gmail.com"
    }
}
```

A cookie jwt that contains token has been created on client

### Conversation
How to create a conversation

POST ``/api/v1/conversations``

```
"body": {
    "name": "conv ultra cool", *(optional)*
    "users": ["6457743b06bad3ec78d4a423"] 
}
```

```
"body": {
    "success": true,
    "messages": "Conversation créer avec succès",
    "conversation": {
        "name": "conv ultra cool",
        "users": [
            {
                "picture": {
                    "url": "https://cdn.discordapp.com/attachments/1099368353203765298/1104778409827119174/Logo.png"
                },
                "_id": "6457743b06bad3ec78d4a423",
                "username": "NayZ",
                "role": "user",
                "__v": 0
            },
            {
                "picture": {
                    "url": "https://cdn.discordapp.com/attachments/1099368353203765298/1104778409827119174/Logo.png"
                },
                "_id": "644812422bcce408718b440d",
                "username": "foo",
                "role": "user",
                "__v": 0
            },
        ],
        "_id": "6458fee6c19ed91ac347f042",
        "created_at": "2023-05-08T13:53:42.037Z",
        "__v": 0
    }
}
```

How to leave a conversation

DELETE ``/api/v1/conversations/{ID}``

### Messages
How to send message in a conversation

POST ``/api/v1/conversations/{ID}/messages``

```
"body": {
    "content": "Hello everyone, how are u today?"
}
```