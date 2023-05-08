http://localhost:80/api/v1/auth/register

Body:

{
    "email": "foo@gmail.com",
    "username": "foo",
    "password": "mypass",
    "confirmPassword": "mypass"
}

Response 201:

{
    "success": true,
    "message": "Utilisateur créer avec succès",
    "user": {
        "_id": "644812422bcce408718b440d",
        "username": "foo",
        "email": "foo@gmail.com"
    }
}

http://localhost:80/api/v1/auth/login

Body:

{
    "login": "foo@gmail.com",
    "password": "mypass"
}

Response 200:

{
    "success": true,
    "message": "Connexion à l'utilisateur effectué avec succès",
    "user": {
        "_id": "644812422bcce408718b440d",
        "email": "foo@gmail.com",
        "username": "foo"
    }
}

### Endpoint

``/api/v1/auth``
``/api/v1/users``
``/api/v1/conversations``
``/api/v1/conversations/{ID}/messages``
``/api/v1/conversations/{ID}/typing``

### Authentication

# Login
How to login to the api

``/api/v1/auth/login``

````
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