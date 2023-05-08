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

``/api/v1/auth/login``

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

``/api/v1/auth/register``

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